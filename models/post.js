const {Schema, default: mongoose} = require("mongoose");

const postSchema = Schema(
    {
       user:{
           type:Schema.Types.ObjectId,
            ref:"user"
       },
       content:{
        type:String,
        required:true,
       },
       date:{
        type:Date,
        default:Date.now()
       },
       likes:[{type:Schema.Types.ObjectId,ref:"user"}]
       
          

    }
)

module.exports = mongoose.model("post",postSchema);