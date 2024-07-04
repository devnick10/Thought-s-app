const mongoose = require("mongoose");
const dbname = "authtest"
const connectDB = async()=>{
      try {
           const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${dbname}`)
           console.log(`MONGODB CONNECTED SUCCESSFULLY || ${connectionInstance.connection.host}` );
      } catch (error) {
        console.log("MONGODB CONECTION ERROR ",error);
      }
}

module.exports = connectDB;

