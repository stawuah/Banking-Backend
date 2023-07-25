const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoBD connected : ${connect.connection.host}`.random)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB