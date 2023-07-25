const express = require('express')
const router =  express.Router()
const {protectJwt ,authorize} = require('../middleware/authMiddleware');

const {getCustomers ,getSingleCustomer , removeCustomer} = require('../controllers/customersControllers')


router.get('/' ,protectJwt,authorize("admin"),getCustomers )

router.get( '/:id',protectJwt,authorize("admin"),getSingleCustomer)

router.delete( '/:id',protectJwt,authorize("admin"),removeCustomer)

module.exports = router