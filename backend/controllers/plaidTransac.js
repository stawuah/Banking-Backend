
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_COUNTRY_CODES = process.env.PLAID_COUNTRY_CODES
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
const CreateTransactionLink = function (request, response, next) {
    Promise.resolve()
        .then(async function () {
            const configs = {
                user: {
                    // This should correspond to a unique id for the current user.
                    client_user_id: 'user-id',
                },
                client_name: 'Plaid Quickstart',
                products: PLAID_PRODUCTS,
                country_codes: PLAID_COUNTRY_CODES,
                language: 'en',
            };

            if (PLAID_REDIRECT_URI !== '') {
                configs.redirect_uri = PLAID_REDIRECT_URI;
            }

            if (PLAID_ANDROID_PACKAGE_NAME !== '') {
                configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
            }
            const createTokenResponse = await client.linkTokenCreate(configs);
            prettyPrintResponse(createTokenResponse);
            response.json(createTokenResponse.data);
        })
        .catch(next);
};


// Create a link token with configs which we can then use to initialize Plaid Link client-side
// for a 'payment-initiation' flow.
// See:
// - https://plaid.com/docs/payment-initiation/
// - https://plaid.com/docs/#payment-initiation-create-link-token-request
const StartPaymentInit = function (request, response, next) {
    Promise.resolve()
        .then(async function () {
            const createRecipientResponse =
                await client.paymentInitiationRecipientCreate({
                    name: 'Harry Potter',
                    iban: 'GB33BUKB20201555555555',
                    address: {
                        street: ['4 Privet Drive'],
                        city: 'Little Whinging',
                        postal_code: '11111',
                        country: 'GB',
                    },
                });
            const recipientId = createRecipientResponse.data.recipient_id;
            prettyPrintResponse(createRecipientResponse);

            const createPaymentResponse =
                await client.paymentInitiationPaymentCreate({
                    recipient_id: recipientId,
                    reference: 'paymentRef',
                    amount: {
                        value: 1.23,
                        currency: 'GBP',
                    },
                });
            prettyPrintResponse(createPaymentResponse);
            const paymentId = createPaymentResponse.data.payment_id;

            // We store the payment_id in memory for demo purposes - in production, store it in a secure
            // persistent data store along with the Payment metadata, such as userId.
            PAYMENT_ID = paymentId;

            const configs = {
                client_name: 'Plaid Quickstart',
                user: {
                    // This should correspond to a unique id for the current user.
                    // Typically, this will be a user ID number from your application.
                    // Personally identifiable information, such as an email address or phone number, should not be used here.
                    client_user_id: uuidv4(),
                },
                // Institutions from all listed countries will be shown.
                country_codes: PLAID_COUNTRY_CODES,
                language: 'en',
                // The 'payment_initiation' product has to be the only element in the 'products' list.
                products: [Products.PaymentInitiation],
                payment_initiation: {
                    payment_id: paymentId,
                },
            };
            if (PLAID_REDIRECT_URI !== '') {
                configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            const createTokenResponse = await client.linkTokenCreate(configs);
            prettyPrintResponse(createTokenResponse);
            response.json(createTokenResponse.data);
        })
        .catch(next);
}

const fullInfo = function (request, response, next) {
    response.json({
        item_id: ITEM_ID,
        access_token: ACCESS_TOKEN,
        products: PLAID_PRODUCTS,
    });
};

module.exports = { CreateTransactionLink, StartPaymentInit, fullInfo }