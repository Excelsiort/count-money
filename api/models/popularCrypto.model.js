const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const popularCryptoSchema = new Schema(
    {
        cryptoCoin: {
            type: Schema.Types.ObjectId,
            ref: "CryptoCoins"
        },
    },
    {
        timestamps: true,
    }
);

popularCryptoSchema.statics.createWithCrypto = async function (cryptoId) {
    let crypto = await CryptoCoinsModel.findById(cryptoId);
    if (crypto) {
        let popularCrypto = await this.create({ crypto: crypto });
        return popularCrypto;
    }
    return null;
};

const PopularCryptoModel = model("PopularCrypto", popularCryptoSchema);

module.exports = PopularCryptoModel;