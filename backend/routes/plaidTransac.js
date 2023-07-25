

const express = require('express')
const router = express.Router()

const { protectJwt } = require('../middleware/authMiddleware');

const { CreateTransactionLink, StartPaymentInit, fullInfo } = require('../controllers/plaidTransac')

router.post('/', protectJwt, CreateTransactionLink)

router.post('/', protectJwt, StartPaymentInit)

router.post('/', protectJwt, fullInfo)
module.exports = router