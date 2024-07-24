const {Schema, default: mongoose} = require("mongoose");

const userSchema = Schema(
    {
       name:{
        required:true,
        type:String,
       },
       username:{
        required:true,
        type:String,
       },
       email:{
        required:true,
        type:String,
       },
       password:{
        required:true,
        type:String,
       },
       profilepic:{
        type:String,
        default:"default.png"
       }
       ,
       posts:[
        {
            type:Schema.Types.ObjectId,
             ref:"post"
         }
    ]
          

    }
)

module.exports = mongoose.model("user",userSchema);