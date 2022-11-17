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
    getAllByName: async (req, res) => {
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
    }
}