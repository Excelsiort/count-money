const UserModel = require('../models/user.model');

let UserController = {
    getAll: async (req, res) => {
        try {
            let users = await UserModel.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let user = await UserModel.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let user = await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    test: async (req, res) => {
        res.status(200).json({ message: "test" });
    }
}

module.exports = UserController;