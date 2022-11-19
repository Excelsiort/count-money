const router = require('express').Router();
const cryptoCoinsController = require("../controllers/cryptoCoins.controller");

//controller routes
router.get("/", 
    /*
        #swagger.path = "/crypto-coins/"
        #swagger.summary = "Get all crypto coins"
        #swagger.tags = ["Crypto Coins"]
    */
    cryptoCoinsController.getAll
);
router.get("/:id", 
    /* 
        #swagger.path = "/crypto-coins/{id}"
        #swagger.summary = "Get crypto coin by id"
        #swagger.tags = ["Crypto Coins"]
    */
    cryptoCoinsController.getOne
);
router.get("/get-one-by-name/:name", 
    /*
        #swagger.path = "/crypto-coins/get-one-by-name/{name}"
        #swagger.summary = "Get crypto coin by name"
        #swagger.tags = ["Crypto Coins"]
    */
    cryptoCoinsController.getOneByName
);
router.post("/create", 
    /*
        #swagger.path = "/crypto-coins/create"
        #swagger.summary = "Create a new crypto coin"
        #swagger.tags = ["Crypto Coins"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Crypto coin to create",
            required: true,
            type: "object",
            schema: { $name: "string", $symbol: "string"}
        }
    */
    cryptoCoinsController.create
);
router.put("/update-by-id/:id", 
    /*
        #swagger.path = "/crypto-coins/update-by-id/{id}"
        #swagger.summary = "Update crypto coin by id"
        #swagger.tags = ["Crypto Coins"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Crypto coin to update",
            required: true,
            type: "object",
            schema: { $name: "string", $symbol: "string"}
        }
    */
    cryptoCoinsController.updateById
);
router.put("/update-by-name/:name", 
    /*
        #swagger.path = "/crypto-coins/update-by-name/{name}"
        #swagger.summary = "Update crypto coin by name"
        #swagger.tags = ["Crypto Coins"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Crypto coin to update",
            required: true,
            type: "object",
            schema: { $name: "string", $symbol: "string"}
        }
    */
    cryptoCoinsController.updateByName
);
router.delete("/delete/:id", 
    /*
        #swagger.path = "/crypto-coins/delete/{id}"
        #swagger.summary = "Delete crypto coin by id"
        #swagger.tags = ["Crypto Coins"]
    */

    cryptoCoinsController.delete
);

module.exports = router;