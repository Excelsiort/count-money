const PopularCryptoModel = require('../models/popularCrypto.model');
const CryptoCoinsModel = require('../models/cryptoCoins.model');
let PopularCryptoController = {
    getAll: async (req, res) => {
        try {
            let popularCryptos = await PopularCryptoModel.find();
            res.status(200).json(popularCryptos);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let crypto = await CryptoCoinsModel.findOne({cryptoId: req.params.cryptoId});
            let popularCrypto = await PopularCryptoModel.create(crypto);
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let crypto = await CryptoCoinsModel.findOne({cryptoId: req.params.cryptoId});
            let popularCrypto = await PopularCryptoModel.findByIdAndDelete(crypto._id);
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = PopularCryptoController;