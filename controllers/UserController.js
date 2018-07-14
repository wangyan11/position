const UserModel = require("../models/UserModel");
const UserController = {
	// 用户登录
	login: function(req, res, next) {
		const {username,password} = req.body;
		UserModel.find({username,password}, (data) => {
			if(data.length === 1) {
				req.session.loginUser = data[0].username;
				res.json({
					res_code: 0,
					res_error: "",
					res_body: {username: data[0].username,email: data[0].email}
				})
			} else {
				res.json({
					res_code: -2,
					res_error: "用户名或密码错误",
					res_body: {}
				})
			}
		}, (err) => {
			res.json({
				res_code: -1,
				res_error: err,
				res_body: {}
			})
		})
	},
	//注册用户方法
	register: function(req, res, next) {
		const {username,password,email} = req.body;
		UserModel.save({username,password,email}, (msg) => {
			res.json({
				res_code: 0,
				res_error: "",
				res_body: msg
			});
		}, (err) => {
			res.json({
				res_code: -1,
				res_error: err,
				res_body: {}
			});
		});
	},
	//判断用户是否登录
	checkLogin: function(req,res,next) {
		var user = req.session.loginUser;
		if(user){
			res.json({
				res_code:0,
				res_error:"",
				res_body:{username:user}
			})
		}else{
			res.json({
				res_code:-1,
				res_error:"用户登录失效",
				res_body:{}
			})
		}
	},
	//退出
	logout:function(req,res,next){
		req.session = null;
		res.json({
			res_code:0,
			res_error:"",
			res_body:{}
		})
	}
}
module.exports = UserController;