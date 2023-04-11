const express=require("express")
const { connection } = require("./config/db")
const cors=require("cors")
const { UserRouter } = require("./routes/user.route")

// const { UsreAuthMiddleware } = require("./middlewares/authentication.middleware")

require("dotenv").config()


const { UserModel } = require("./model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const app=express()

app.use(cors())
app.use(express.json())



//get
app.get("/", (req, res) => {
  res.send("Welcome to our Project.");
});

app.use("/users", UserRouter);

// app.use(UsreAuthMiddleware)















  

  
  





 






app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to db",process.env.port)
    } catch (error) {
        console.log(error)
    }
})