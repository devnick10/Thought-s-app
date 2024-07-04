const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./db/index"); 
const user = require("./models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");



app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/singup",(req,res)=>{
    res.render("singup");
});
app.get("/profile",(req,res)=>{

    let userdata = jwt.verify(req.cookies.token,"secret")
    if(!userdata)res.send("something went wrong");
    //  res.send(userdata);
    res.render("profile",{user:userdata});



});

app.post("/singup",(req,res)=>{
     let {name,username,email,password} = req.body;
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{
          let createdUser = await user.create({
            name,
            username,
            email,
            password:hash,
    
          })
          if (!createdUser)res.send("user not created plz. retry")
          
            let token = jwt.sign({email},"secret");
            res.cookie("token",token);

            res.redirect("/profile",)

        })
     })
});

app.post("/login", async(req,res)=>{
    let {username,password} = req.body;
    
    let userdata = await user.findOne({username:username});
    if(!userdata)res.send("invalid username or password")
    
    bcrypt.compare(password,userdata.password,(err,result)=>{
        if(!result)res.send("invalid username or password");

        const payload = {
           email: userdata.email,
           username: userdata.username,
           name: userdata.name,
        }

        let token = jwt.sign(payload,"secret");
        res.cookie("token",token);

        res.redirect("/profile",)
    })


})


app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/singup")
})













connectDB()
app.listen(3000,()=>{
    console.log("SERVER RUNNING AT PORT || 3000");
});


