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

// app.use("/users", UserRouter);
// app.use("/products" , ProductRouter);
// app.use(UsreAuthMiddleware)
// app.use("/cart", CartRouter);
// app.use("/admin" , AdminUserRouter );
// app.use("/block" , BlockRouter );














//register 

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
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
          const user = new UserModel({ name, email, password: hash});
          await user.save();
          res.send({ massege: "New user register" });
        }
      });
  
  
  
  
    } catch (error) {
      res.send({ massege: "something went wrong" });
    }
  
  
  });
  
  //login
  
  
  app.post("/login", async (req, res) => {
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



  //getProfile


  app.get("/getProfile", async (req, res) => {

    const notes = await UserModel.find()
    res.send(notes);
  });




  //calculate

 

  app.post("/calculate", async (req, res) => {
    const { Annual_investment, Total_Year, Annual_rate } = req.body;
    try {
      const Total_Maturity_Value = Annual_investment * [(((1+Annual_rate) ^Total_Year)-1)/Annual_rate]
      console.log(Total_Maturity_Value)
      res.send(Total_Maturity_Value)
      // res.sendStatus(200).send(Total_Maturity_Value)
      



    } catch (error) {
      res.send({ massege: "something went wrong" });
    }
  });




app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to db",process.env.port)
    } catch (error) {
        console.log(error)
    }
})