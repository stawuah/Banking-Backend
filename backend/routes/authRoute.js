const express = require('express')
const router = express.Router()


const {
    registerCustomer,
    login,
    updateCustomerInfo,
    resetPassword,
    forgotPassword,
    logout,
}
    = require('../controllers/authControllers');



router.post('/logout', logout);

router.post('/reset-password', resetPassword);

router.post('/forgot-password', forgotPassword);

router.post('/register', registerCustomer)

router.post('/login', login)

router.put('/:id', updateCustomerInfo)



module.exports = router;



