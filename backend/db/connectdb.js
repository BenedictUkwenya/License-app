const mongoose = require("mongoose");


const connectMongoDB = async()=>{
    try{
        console.log("MONGO_URI:", process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected!")
    }
    catch(error){
        console.log(`${error.message}`);
        process.exit(1);
    }
}
module.exports = connectMongoDB;