const router = require('express').Router();
const popularCryptoController = require("../controllers/popularCrypto.controller");

//controller routes with swagger documentation

router.get("/",
    /*
        #swagger.path = "/popular-crypto/"
        #swagger.summary = "Get all popular cryptos"
        #swagger.tags = ["Popular Crypto"]
    */
    popularCryptoController.getAll
);
router.post("/create",
    /*
        #swagger.path = "/popular-crypto/create"
        #swagger.summary = "Create a new popular crypto"
        #swagger.tags = ["Popular Crypto"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Popular crypto to create",
            required: true,
            type: "object",
            schema: { $cryptoId: "string"}
        }
    */
    popularCryptoController.create
);
router.delete("/delete-by-id/:cryptoId",
    /*
        #swagger.path = "/popular-crypto/delete-by-id/{cryptoId}"
        #swagger.summary = "Delete a popular crypto by cryptoId"
        #swagger.tags = ["Popular Crypto"]
    */
    popularCryptoController.delete
);

module.exports = router;