const CryptoCoinsModel = require('../models/cryptoCoins.model');

let CryptoCoinsController = {
    getAll: async (req, res) => {
        try {
            let cryptoCoins = await CryptoCoinsModel.find();
            res.status(200).json(cryptoCoins);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findById(req.params.id);
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByName: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findOne({name: req.params.name});
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.create(req.body);
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateById: async (req, res) => {
        try {
            let coin = await CryptoCoinsModel.findById(req.params.id);
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, {name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol})
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateByName: async (req, res) => {
        try {
            let coin = await CryptoCoinsModel.findOne({name: req.params.name});
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, {name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol})
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findByIdAndDelete(req.params.id);
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = CryptoCoinsController;