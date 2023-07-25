
const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true , 'Dear customer please add a name'], 
    },
    email:{
        type: String,
        required: [true , 'Dear customer please add a name'], 
        unique: true,
        lowercase: true,
        trim: true, 
        match : [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please your email']
    },
    occupation:{
        type: String,
        required: [true , 'Dear customer please add your occupation'], 
    },
    city:{
        type: String,
        required: [true , 'Dear customer please add a city name'], 
    },
    password:{
        type: String,
        required: [true , 'Dear customer please use your usual email password '], 
    },
    role: {
        type: String ,
        enum: ["customer", "admin"],
        default:'customer'
    },
    dob:{
        type: String,
        required: [true , 'Add your date of birth'],
        match : [/^\d{4}-\d{2}-\d{2}$/ , 'Please add your  dob']
    },
    forgotPassword: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForgotSchema'
    }
},)


module.exports = mongoose.model('Customer' , CustomerSchema)




