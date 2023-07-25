const mongoose = require('mongoose')


const policySchema = mongoose.Schema({
    policyname:{
        type: String,
        required :[true , 'Please add a policy name']
    },
    name:{
        type: String,
        required :[true , 'Please add a your name']
    },
    date:{
        type : Date,
        default : Date.now
    },
    description: {
        type: String,
        required:[true , 'Please add a description']
    },
    city: {
        type: String,
        required :[true , 'Please add a city']
    },
    mobileNumber: {
        type: String,
        required: [true , 'Please add a mobileNumber']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true ,
        ref: 'Customer'
    },
})
module.exports = mongoose.model('Policy' , policySchema)

