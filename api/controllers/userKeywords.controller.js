const UserKeywordsModel = require('../models/userKeywords.model');

let UserKeywordsController = {
    getAll: async (req, res) => {
        try {
            let userKeywords = await UserKeywordsModel.find();
            res.status(200).json(userKeywords);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllFromUser: async (req, res) => {
        try {
            let userKeywords = await UserKeywordsModel.find({user: req.params.user});
            res.status(200).json(userKeywords);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.findById(req.params.id);
            res.status(200).json(userKeyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllByKeyword: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.find({keyword: req.params.keyword});
            res.status(200).json(userKeyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createWithUserAndKeyword: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.createWithUserAndKeyword({userId: req.params.userId, keywordId: req.params.keywordId});
            res.status(200).json(userKeyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.findByIdAndUpdate(req.params.id, {keyword:req.params.keyword})
            res.status(200).json(userKeyword)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteById: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.findByIdAndDelete(req.params.id);
            res.status(200).json(userKeyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteByName: async (req, res) => {
        try {
            let userKeyword = await UserKeywordsModel.findOne({keyword: req.params.keyword});
            userKeyword = await UserKeywordsModel.findByIdAndDelete(userKeyword._id);
            res.status(200).json(userKeyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAllFromUser: async (req, res) => {
        try {
            let userKeywords = await UserKeywordsModel.find({user: req.params.user});
            userKeywords = await UserKeywordsModel.deleteMany({user: req.params.user});
            res.status(200).json(userKeywords);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserKeywordsController;