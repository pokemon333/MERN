const mongoose = require('mongoose')


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOSE_CONNECT_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;