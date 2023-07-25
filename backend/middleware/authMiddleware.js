const jwt = require('jsonwebtoken');
const Customer = require('../models/customerSchema');
require('dotenv').config();


const protectJwt = async (req , res , next) => {

  let token;

  if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //set token as bearer token in the headers
    token = req.headers.authorization.split(" ")[1];
  }

 //make sure token exists
  if (!token) {
    return res.status(401).json('Not authorized to access this route');
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Customer.findById(decoded.id);
    next();

  } catch (err){
    return res.status(401).json('Not authorized to access this route')
  }
}


const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
	message: `User role ${req.user.role} is not authorized to access this route`,
})
    }
    next();
  };
};

module.exports = {protectJwt ,authorize};



















