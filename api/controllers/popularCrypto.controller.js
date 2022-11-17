const PopularCryptoModel = require('../models/popularCrypto.model');

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
            let popularCrypto = await PopularCryptoModel.create(req.body);
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let popularCrypto = await PopularCryptoModel.findByIdAndDelete(req.params.id);
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}