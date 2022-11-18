const router = require('express').Router();
const keywordsController = require("../controllers/keywords.controllers");

//controller routes
router.get("/", keywordsController.getAll);
router.get("/:id", keywordsController.getOne);
router.get("/get-one-by-name/:name", keywordsController.getOneByName);
/* post object example
    {
        "keyword": "test"
    }
*/
router.post("/create", keywordsController.create);
/* put object example with keyword id
    {
        "keyword": "test"
    }
*/
router.put("/update-by-id/:id", keywordsController.updateById);
/* put object example with keyword name
    {
        "keyword": "test"
    }
*/
router.put("/update-by-name/:name", keywordsController.updateByName);
router.delete("/delete/:id", keywordsController.deleteById);
router.delete("/delete-by-name/:name", keywordsController.deleteByName);
