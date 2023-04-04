const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String


}, {
    versionKey: false,
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}

  


