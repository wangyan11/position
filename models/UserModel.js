const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/position_project");
const schema = mongoose.Schema({
	username:String,
	password:String,
	email:String
});
const User = mongoose.model("user",schema);
const UserModel = {
	save:function(userinfo,success,error){
		const user = new User(userinfo);
		user.save((err,userinfo)=>{
			if(err){
				error(err);
				return;
			}
			success(userinfo);
		});
	},
	find : function(userinfo, success, error) {
		User.find(userinfo).then(success, error);
	}
}
module.exports = UserModel;