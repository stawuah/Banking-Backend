
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const Customer = require('../models/customerSchema');
const ForgotSchema = require('../models/tokenSchema');
const generateToken = require('../utils/token')
const jwtSecretKey = process.env.JWT_SECRET;



//@ Authenticate new customer
//@ Route    POST /api/customers/login
//@ access private
const login = asyncHandler(async (req, res) => {

  const { password, email } = req.body;
  const customer = await Customer.findOne({ email })


  const giveToken = jwt.sign({ id: customer._id }, jwtSecretKey, {
    expiresIn: process.env.EXPIRES_IN
  })

  if (customer && (await bcrypt.compare(password, customer.password))) {
    res.json({ customer, giveToken, })

    setTimeout(() => {
      res.redirect(302, 'http://localhost:5000/home/');
    }, 2000);

  } else {
    res.status(400)
    throw new Error('Invalid Password or email !')
  }

})

// LOGOUT

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).send({
    success: true,
    message: 'You have been logged out successfully!',
  });

  setTimeout(() => {
    res.redirect(302, 'http://localhost:5000/home/');
  }, 3000);
});



// UPDATE CUSTOMER
const updateCustomerInfo = asyncHandler(async (req, res) => {

  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(201).json(customer)

  if (!customer) {
    res.status(400).json({ message: 'cannot update !' })
  }

})

//@ Register newcustomer
//@ Route    POST /api/customers
//@ access private
const registerCustomer = asyncHandler(async (req, res) => {

  try {
    const { name, email, occupation, city, password, role, dob } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newCustomer = await new Customer({
      name,
      email,
      occupation,
      city,
      password: hashedPassword,
      role,
      dob,
    })
    const savedCustomer = await newCustomer.save()
    console.log("savedCustomer", savedCustomer)
    res.status(201).json(savedCustomer)

    setTimeout(() => {
      res.redirect(302, 'http://localhost:5000/home/');
    }, 3000);

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


const forgotPassword = async (req, res) => {
  try {

    const { email, name } = req.body

    const check = await Customer.findOne({ email, name })
    if (check) {
      console.log(check);
    }
    // create a generate a token for the existing user if not invalid user
    const forgotCustomer = await new ForgotSchema({
      name,
      email: check._id,
      token: generateToken().value
    })
    // save existing user id and token in db
    const saveForgotCustomer = await forgotCustomer.save()
    console.log("saveCustomer", saveForgotCustomer)
    res.status(201).json(saveForgotCustomer)

    setTimeout(() => {
      res.redirect(302, 'http://localhost:3000/reset-password');
    }, 3000);

  } catch (error) {
    res.status(400).json({ "message": "Invalid User or Credentials" })
  }
}

const resetPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {
    // Find the token in the database
    const forgotPassword = await ForgotSchema.findOne({ token });

    // Check if the token exists and is not expired
    if (!forgotPassword || forgotPassword.expired) {
      throw new Error('Invalid or expired password reset token.');
    }

    // Update the user's password
    const customer = await Customer.findById(forgotPassword.email);
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    customer.password = hashedPassword;
    await customer.save();

    // Mark the token as used
    forgotPassword.used = true;
    await forgotPassword.save();

    res.status(200).json({ message: 'Password reset successful please go back and login, you will be redirect soon' });

    setTimeout(() => {
      res.redirect(302, 'http://localhost:3000/login');
    }, 3000);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }


}


module.exports = {
  login,
  logout,
  resetPassword,
  updateCustomerInfo,
  forgotPassword,
  registerCustomer
}