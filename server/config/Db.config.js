const mongoose = require("mongoose");
const ConDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Datbase connect");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = ConDb;