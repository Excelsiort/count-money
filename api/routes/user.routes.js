const router = require('express').Router();
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controller");

//auth
router.get("/:id", userController.getOne);

module.exports = router;