const router = require('express').Router();
const userPreferencesController = require("../controllers/userPreferences.controllers");

//controller routes
router.get("/", userPreferencesController.getAll);
//get with user id
router.get("/get-all-from-user/:id", userPreferencesController.getAllFromUser);
/* post object with user id, theme and language example
    {
        "user": "5f9e1b0b0b9b9c0b8c8c0b9b",
        "theme": "dark",
        "language": "fr"
    }
*/
router.post("/create-preference/", userPreferencesController.createWithUserAndPreference);