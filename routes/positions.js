var express = require('express');
var router = express.Router();
var PositionController = require("../controllers/PositionController");

var multer = require("multer");
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,"./public/upload");
	},
	filename:function(req,file,cb){
		cb(null,file.fieldname+"-"+Date.now()+file.originalname.slice(file.originalname.lastIndexOf(".")));
	}
});
var upload = multer({storage:storage});

router.post('/add', upload.single("logo"),PositionController.add);
router.get("/list",PositionController.list);
router.get("/findById",PositionController.findById);
router.post("/update",upload.single("logo"),PositionController.update);
router.post("/delete",PositionController.delete);
router.get("/page",PositionController.page);
module.exports = router;

