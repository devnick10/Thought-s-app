const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./db/index"); 
const userModel = require("./models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const postModel = require("./models/post");
const multer = require("multer");
const authenticated = require("./middlewares/authentication");
const upload = require("./middlewares/multer");
const cacheControl = require("./middlewares/cacheControl");

app.use(cacheControl);
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
app.get("/profile",authenticated,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate("posts")

    res.render("profile",{user:user});



});

app.post("/post",authenticated,async(req,res)=>{

   let user = await userModel.findOne({email:req.user.email});
   let post = await postModel.create({
    content:req.body.content,
    user:user._id
   });
   user.posts.push(post._id);
   await user.save();
   res.redirect("/profile")
})
app.get("/edit/:id",authenticated,async(req,res)=>{
   let post = await postModel.findOne({_id:req.params.id}).populate("user");
   await post.save();
   res.render("edit",{post});
});
app.post("/update/:id",authenticated,async(req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content}).populate("user");
    await post.save();
    if(!post)res.send("Error:post not update")
        res.redirect("/profile");
});
app.get("/like/:id",authenticated,async(req,res)=>{
   let post = await postModel.findOne({_id:req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
   await post.save();
   res.redirect('/profile');
    
     

});




app.get("/profile/feed",authenticated,async(req,res)=>{
     
const user = await userModel.findOne({_id:req.user.userid})
const post = await postModel.find().populate("user");

 res.render("feed",{user:user,post:post})

})








app.get("/profile/upload",(req,res)=>{
     res.render("uploadProfile")
})
app.post("/upload",authenticated,upload.single("image"),async(req,res)=>{
      
    const user = await userModel.findOne({_id:req.user.userid})
    user.profilepic = req.file.filename;
    await user.save();

     res.redirect("/profile")
})



















app.post("/singup",(req,res)=>{
     let {name,username,email,password} = req.body;
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{
          let createdUser = await userModel.create({
            name,
            username,
            email,
            password:hash,
    
          })
          if (!createdUser)res.send("user not created plz. retry")
          
            let token = jwt.sign({name,username,email,userid:createdUser._id},"secret");
            res.cookie("token",token);
            
            res.redirect("/profile")
            

        })
     })
});

app.post("/login", async(req,res)=>{
    let {username,password} = req.body;
    

    let userdata = await userModel.findOne({username:username});
    if(!userdata)res.send("Invalid Username OR Password");
    
    bcrypt.compare(password,userdata.password,(err,result)=>{
        if(!result)res.send("Invalid Username OR Password");

        const payload = {
           email: userdata.email,
           username: userdata.username,
           name: userdata.name,
           userid:userdata._id,
        }

        let token = jwt.sign(payload,"secret");
        res.cookie("token",token);

        res.redirect("/profile",)
    })


})


app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login")
})













connectDB()
app.listen(3000,()=>{
    console.log("SERVER RUNNING AT PORT || 3000");
});


