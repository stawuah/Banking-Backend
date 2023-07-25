const crypto = require('crypto')

const generateToken = () => {
    const token = {
        value: crypto.randomBytes(12).toString('hex'),
        expiration: Date.now() + (5 * 60 * 1000) // 5 minutes in milliseconds
    };
    console.log('token' , token)

    return token 
}

module.exports = generateToken
