const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userPreferencesSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        theme: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        },
        language: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into DB

const UserPreferencesModel = model("UserPreferences", userPreferencesSchema);

module.exports = UserPreferencesModel;