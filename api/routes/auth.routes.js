const router = require('express').Router();
const authController = require("../controllers/auth.controllers");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.signOut);

module.exports = router;