const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        allowNull: true
    },
    lastname: {
        type: String,
        required: true,
        allowNull: true
    },
    email: {
        type: String,
        required: true,
        allowNull: true
    },
    password: {
        type: String,
        required: true,
        allowNull: true
    },
    type: {
        type: String,
        required: true,
        allowNull: true,
        default: "user"
    }
})

const UserModelEcom = mongoose.model("UserModelEcom", userSchema);

module.exports = UserModelEcom;