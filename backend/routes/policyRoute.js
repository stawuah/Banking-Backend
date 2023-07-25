const express = require('express')
const router =  express.Router()

const {protectJwt} = require('../middleware/authMiddleware');
const { getPolicy, deletePolicy, updatePolicy ,createPolicy} = require ('../controllers/policyController')

 
router
.get('/',protectJwt, getPolicy)
.post('/',protectJwt, createPolicy,) 

router
.put('/:id',protectJwt, updatePolicy)
.delete('/:id',protectJwt, deletePolicy) 


module.exports = router