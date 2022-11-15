import { Schema, model } from 'mongoose';


const roleSchema = new Schema(
    {
        userrole : {
            type: Schema.Types.ObjectId,
            ref: "Userrole"
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into DB

const UserModel = model("Role", roleSchema);

module.exports = UserModel;