const Customer = require('../models/customerSchema')

// Only admin can get all customers
const getCustomers = async (req, res) => {
    const customer = await Customer.find().populate({
        path: 'policy'
    })

    res.json({ count: customer.length, customer })
}

// Only admin can get single customer
const getSingleCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    res.json({ count: customer.length, customer })
}

// Only admin can delete customer
const removeCustomer = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id)
    res.send("Customer has been deleted").status(201)
}

module.exports = { getCustomers, getSingleCustomer, removeCustomer }