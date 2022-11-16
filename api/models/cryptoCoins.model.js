const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cryptoCoinsSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 2,
            maxLenght: 50,
            unique: true,
            trim: true
        },
        symbol: {
            type: String,
            require: true,
            minLength: 2,
            maxLenght: 50,
            unique: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

const CryptoCoinsModel = model("CryptoCoins", cryptoCoinsSchema);

module.exports = CryptoCoinsModel;