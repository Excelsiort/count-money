const router = require('express').Router();
const cryptoCoinsController = require("../controllers/cryptoCoins.controllers");

//controller routes
router.get("/", cryptoCoinsController.getAll);
router.get("/:id", cryptoCoinsController.getOne);
router.get("/get-one-by-name/:name", cryptoCoinsController.getOneByName);
router.post("/create", cryptoCoinsController.create);
router.put("/update-by-id/:id", cryptoCoinsController.updateById);
router.put("/update-by-name/:name", cryptoCoinsController.updateByName);
router.delete("/delete/:id", cryptoCoinsController.delete);
