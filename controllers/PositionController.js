const PositionModel = require("../models/PositionModel");

const PositionController = {
	add : function(req, res, next) {
		const {position, company, experience,type,site,salary} = req.body;
		let logo = "";
		if(req.file){
			logo = "/upload/"+req.file.filename;
		}
		PositionModel.save({position, company, experience,type,site,salary,logo}, (data)=>{
			res.json({
				res_code : 0,
				res_error :"",
				res_body : data
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},
	list:function(req,res,next){
		const {pageIndex} = req.query;
		PositionModel.findByPage(pageIndex,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		})
	},
	findById:function(req,res,next){
		const {currentId} = req.query;
		PositionModel.findById(currentId,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		})
	},
	update:function(req,res,next){
		const {id,position, company, experience,type,site,salary} = req.body;
		let logo = "";
		if(req.file){
			logo = "/upload/"+req.file.filename;
		};
		PositionModel.update({id,position, company, experience,type,site,salary,logo}, (data)=>{
			res.json({
				res_code : 0,
				res_error :"",
				res_body : data
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},
	delete:function(req,res,next){
		const {id} = req.body;
		PositionModel.delete(id, (data)=>{
			res.json({
				res_code : 0,
				res_error :"",
				res_body : data
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});
	},
	page:function(req,res,next){
		PositionModel.page((data)=>{
			res.json({
				res_code : 0,
				res_error :"",
				res_body : data
			});
		}, (err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		})
	}
};

module.exports = PositionController;
