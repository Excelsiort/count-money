const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async(req, res) => {
    const {username, email, password} = req.body;
    try {
        const user = await UserModel.create({username, email, password})
        const token = createToken(user._id);
        res.cookie('jwt', token, { httponly: true, maxAge});
        res.cookie('username', username, { httponly: true, maxAge});
        res.status(200).json({ user: user._id })

    } catch(err) {
        const errors = signUpErrors(err);
        console.log(errors);
        res.status(401).send({ errors });
    } 
}

module.exports.signIn = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.cookie('usrname', user.pseudo, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id})
      } catch (err){
        const errors = signInErrors(err);
        res.status(401).json({ errors });
      }
}

module.exports.signOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}