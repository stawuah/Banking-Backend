const asyncHandler = require('express-async-handler')
const Policy = require('../models/policySchema')


const getPolicy = asyncHandler(async (req, res) => {

    const policy = await Policy.find().populate({
        path: 'customer',
        select: 'name , email , occupation ,city'
    })
    res.json({ count: policy.length, policy }).status(200)
})


const createPolicy = asyncHandler(async (req, res) => {
    req.body.customer = req.user.id;
    if (!req.body && !mongoose.isValidObjectId(req.user.id)) {
        return res.status(400).json({ error: "Hello , customer please add a policy" })
    }

    const policy = await Policy.create(req.body)
    res.status(201).json({ policy })
})


const updatePolicy = asyncHandler(async (req, res) => {
    req.body.customer = req.user.id
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(201).json(policy)

    if (!Policy) {
        res.status(400)
    }

})


const deletePolicy = asyncHandler(async (req, res) => {

    await Policy.findByIdAndDelete(req.params.id)
    res.status(201).json({ message: 'policy deleted' })

    if (!req.params.id) {
        res.status(403).send('Hello, you are forbidden to entry')
    }

})

module.exports = {
    getPolicy,
    createPolicy,
    updatePolicy,
    deletePolicy,
}