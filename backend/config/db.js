const mongoose = require('mongoose')

//all mongoose methods are async to return a promise
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = {connectDB}