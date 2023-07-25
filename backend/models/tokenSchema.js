const mongoose = require('mongoose');

const ForgotPasswordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token:{
        type : String
    }
})

module.exports = mongoose.model('ForgotSchema' , ForgotPasswordSchema)

