require('colors')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorMiddleware');
const helmet = require('helmet')
const connectDB = require('./config/db');
const compression = require('compression')
const { Configuration, PlaidApi, Products, PlaidEnvironments } = require('plaid');

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;

const app = express()

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
	basePath: PlaidEnvironments[PLAID_ENV],
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
			'PLAID-SECRET': PLAID_SECRET,
			'Plaid-Version': '2020-09-14',
		},
	},
});
const client = new PlaidApi(configuration);

app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());
app.use(cors());




connectDB()

app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.json())
app.use(compression)
app.use(express.urlencoded({ extended: false }))

// Apply the rate limiting middleware to all requests
const limitter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use('/api/policies', limitter, require('./routes/policyRoute'))// post , get ,update delete = policy 
app.use('/api/auth', limitter, require('./routes/authRoute')) // login , register, = customer
app.use('/api/customers', limitter, require('./routes/customerRoute'))
app.use('/api/create_link_token', limitter, require('./routes/plaidTransac'))
app.use('/api/create_link_token_for_payment', limitter, require('./routes/plaidTransac'))
app.use('/api/info', limitter, require('./routes/plaidTransac'))
app.listen(port, () => console.log(`server is up and runing on port ${port}`))





