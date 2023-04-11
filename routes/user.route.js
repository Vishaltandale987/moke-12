const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./../model/User.model");

const UserRouter = express.Router();

//all users



UserRouter.get("/", async (req, res) => {

  const notes = await UserModel.find()
  res.send(notes);
});

//register

UserRouter.post("/register", async (req, res) => {
  const {  email, password } = req.body;
  let logindata = await UserModel.find({ email: email })
  try {
    if (logindata.length !== 0) {
     return res.send({ massege: " Register Already Exist" });
    }




    bcrypt.hash(password, 5, async (err, hash) => {
  
      if (err) {
        res.send({ massege: "something went wrong", error: err.message });
      }

      else {
        const user = new UserModel({  email, password: hash });
        await user.save();
        res.send({ massege: "New user register" });
      }
    });




  } catch (error) {
    res.send({ massege: "something went wrong" });
  }


});

//login


UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");

          res.send({ massege: "login successful", token: token });
        } else {
          res.send({ massege: "something went wrong" });
        }
      });
    } else {
      res.send({ massege: "wrong coredentials" });
    }
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});



module.exports = {
  UserRouter,
};
