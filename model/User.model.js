const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    password: String,
    email: String


}, {
    versionKey: false,
    timestamps: false
})

const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}

  


