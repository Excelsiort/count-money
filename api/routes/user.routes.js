const router = require('express').Router();
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controller");

//auth
router.get("/:id", userController.getOne);
router.get("/get-user-roles/:id", userController.getUserRoles);
router.post("/add-user-roles/:id", userController.addUserRoles);
router.post("/remove-user-roles/:id", userController.removeUserRoles);

module.exports = router;