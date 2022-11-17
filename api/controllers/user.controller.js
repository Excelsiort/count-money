const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');
const UserRoleModel = require('../models/userRole.model');


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
    getUserRoles: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            console.log("user",user);
            let userroles = await UserRoleModel.find({user: user._id});
            console.log("userroles",userroles);
            let roles = [];
            for (let i = 0; i < userroles.length; i++) {
                let role = await RoleModel.findById(userroles[i].role);
                roles.push(role.description);
            }
            res.status(200).json(roles);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addUserRoles: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            let roles = req.body.roles;
            let exists = false;

            for (let i = 0; i < roles.length; i++) {
                let role = await RoleModel.findOne({description: roles[i]});
                let currentRole = await UserRoleModel.findOne({user: user._id, role: role._id});
                if (!currentRole) {
                    let userrole = await UserRoleModel.create({user: user._id, role: role._id});
                } else {
                    exists = true;
                }
            }

            !exists ? res.status(200).json("User roles added") : res.status(200).json("User roles already exist");
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeUserRoles: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            let roles = req.body.roles;

            for (let i = 0; i < roles.length; i++) {
                let role = await RoleModel.findOne({description: roles[i]});
                let userrole = await UserRoleModel.findOneAndDelete({user: user._id, role: role._id});
            }
            res.status(200).json("User roles removed");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            const user = await UserModel.create(req.body);
            res.status(200).json(user);
        }
        catch (err) {
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
    }
}

module.exports = UserController;