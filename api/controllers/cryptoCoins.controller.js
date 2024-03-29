const CryptoCoinsModel = require('../models/cryptoCoins.model');
const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');
const PopularCryptoModel = require('../models/popularCrypto.model');
const express = require('express');
const paginate = require('express-paginate');

let CryptoCoinsController = {
    getAll: async (req, res) => {
        const marketCapSort = req.query.sort === 'marketCap' ? (req.query.filter === 'ascending' ? 1 : (req.query.filter === 'descending' ? -1 : 0)) : 0;
        const totalSupply = req.query.sort === 'totalSupply' ? (req.query.filter === 'ascending' ? 1 : (req.query.filter === 'descending' ? -1 : 0)) : 0;
        const circulatingSupply = req.query.sort === 'circulatingSupply' ? (req.query.filter === 'ascending' ? 1 : (req.query.filter === 'descending' ? -1 : 0)) : 0;
        const isPopular = req.query.sort === 'isPopular' ? (req.query.filter === 'ascending' ? 1 : (req.query.filter === 'descending' ? -1 : 0)) : 0;

        const sortSelector = () => {

            if (marketCapSort === 1 || marketCapSort === -1) {
                return { marketCap: marketCapSort };
            } else if (totalSupply === 1 || totalSupply === -1) {
                return { totalSupply: totalSupply };
            } else if (circulatingSupply === 1 || circulatingSupply === -1) {
                return { circulatingSupply: circulatingSupply };
            } else if (isPopular === 1 || isPopular === -1) {
                return { isPopular: isPopular };
            }

            return {};

        }


        try {
            //get crypto coins sorted by market cap
            const [results, itemCount] = await Promise.all([
                CryptoCoinsModel.find({}).sort(sortSelector()).limit(req.query.limit).skip(req.skip).lean().exec(),
                CryptoCoinsModel.countDocuments({})
            ]);
            const pageCount = Math.ceil(itemCount / req.query.limit);

            // inspired by Stripe's API response for list objects
            res.status(200).json({
                pageCount,
                itemCount,
                cryptoCoins: results,
                pages: paginate.getArrayPages(req)(2, pageCount, req.query.page)
            });


        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        //a changer
        try {
            let cryptoCoin = await CryptoCoinsModel.findById(req.params.id);
            let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: req.params.id });
            let response = {
                cryptoCoin: cryptoCoin,
                cryptoCoinDetails: cryptoCoinDetails
            }
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByName: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findOne({ name: req.params.name });
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
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, { name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol })
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateByName: async (req, res) => {
        try {
            let coin = await CryptoCoinsModel.findOne({ name: req.params.name });
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, { name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol })
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
    },
    updateCryptoDetails: async (req, res) => {
        try {
            //get all crypto coins
            let cryptoCoins = await CryptoCoinsModel.find();
            //loop through all crypto coins
            for (let i = 0; i < cryptoCoins.length; i++) {
                //get crypto coin details from db via crypto coin id
                let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoins[i]._id });
                //if crypto coin details exist
                if (cryptoCoinDetails) {
                    //update crypto coin details logoUrl with crypto coin logoUrl, name and symbol
                    cryptoCoinDetails.logoUrl = cryptoCoins[i].logoUrl;
                    cryptoCoinDetails.name = cryptoCoins[i].name;
                    cryptoCoinDetails.symbol = cryptoCoins[i].symbol;
                    //save crypto coin details
                    await cryptoCoinDetails.save();
                } else {
                    //create new crypto coin details with name, symbol and logoUrl and related crypto coin id
                    await CryptoCoinDetailsModel.create({ name: cryptoCoins[i].name, symbol: cryptoCoins[i].symbol, logoUrl: cryptoCoins[i].logoUrl, cryptoCoin: cryptoCoins[i]._id });
                }




            }
            res.status(200).json("All Crypto Coin Details Updated");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    togglePopularCryptoCoin: async (req, res) => {
        try {

            await CryptoCoinsModel.updateOne({ _id: req.params.id }, {
                $set: {
                    isPopular: req.body.isPopular
                }
            });

            let crypto = await CryptoCoinsModel.findById(req.params.id);
            let popularCrypto = await PopularCryptoModel.create({ cryptoCoin: crypto });
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateCryptoCoinsWithCryptoDetails: async (req, res) => {
        try {
            //get all crypto coins
            let cryptoCoins = await CryptoCoinsModel.find();
            //loop through all crypto coins

            for (let i = 0; i < cryptoCoins.length; i++) {
                //get crypto coin details from db via crypto coin id
                let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoins[i]._id });
                //if crypto coin details exist
                if (cryptoCoinDetails) {
                    //update crypto coin details logoUrl with crypto coin logoUrl, name and symbol
                    cryptoCoins[i].marketCap = cryptoCoinDetails.marketCap ?? 0;
                    cryptoCoins[i].circulatingSupply = cryptoCoinDetails.circulatingSupply ?? 0;
                    cryptoCoins[i].totalSupply = cryptoCoinDetails.totalSupply ?? 0;
                    //save crypto coin details
                    await cryptoCoins[i].save();
                }
            }
            res.status(200).json("All Crypto Coin Details Updated");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = CryptoCoinsController;