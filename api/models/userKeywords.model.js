const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userKeywordsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        keyword: {
            type: Schema.Types.ObjectId,
            ref: "Keywords"
        }
    },
    {
        timestamps: true,
    }
);

const UserKeywordsModel = model("UserKeywords", userKeywordsSchema);

module.exports = UserKeywordsModel;