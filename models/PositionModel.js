const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/position_project");
const schema = mongoose.Schema({
	position:String,
	company:String,
	experience:String,
	type:String,
	site:String,
	salary:Number,
	logo:String
});
const Position = mongoose.model("position",schema);
const PositionModel = {
	save:function(positionInfo,success,error){
		const pos = new Position(positionInfo);
		pos.save((err,data)=>{
			if(err){
				error(err);
				return;
			}
			success(data);
		});
	},
	findByPage : function(pageIndex,success,error){
		const pageSize = 5;
		Position.find()
				.limit(pageSize)
				.skip((pageIndex-1)*pageSize)
				.then(success,error);
	},
	findById:function(currentId,success,error){
		Position.find({_id:currentId}).then(success,error);
	},
	update:function(posInfo,success,error){
		Position.update({_id:posInfo.id},{$set:{
			position:posInfo.position,
			company:posInfo.company, 
			experience:posInfo.experience,
			type:posInfo.type,
			site:posInfo.site,
			salary:posInfo.salary,
			logo:posInfo.logo
			}
		}).then(success,error);
	},
	delete:function(id,success,error){
		Position.deleteOne({_id:id}).then(success,error);
	},
	page:function(success,error){
		Position.count().then(success,error);
	}
}
module.exports = PositionModel;