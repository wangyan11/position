var express = require('express');
var router = express.Router();
var UserController = require("../controllers/UserController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/check",UserController.checkLogin);
router.post("/login", UserController.login);
router.get("/logout",UserController.logout);
router.post("/register",UserController.register);

module.exports = router;
