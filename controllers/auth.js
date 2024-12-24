const { signToken } = require('../middleware/jwtUtils')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/signup', async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body
        if (!username || !password || !phoneNumber)
            return res.status(400).json({ error: 'Missing required fields.' })
        const userExist = await User.findOne({ username })
        if (userExist)
            return res.status(409).json({ error: 'Username already taken.' })
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
        const user = await User.create({ username, password: hashedPassword, phoneNumber })
        const token = signToken(user)
        return res.status(201).json({ message: 'User created', token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong!' })
    }
})
router.post('/signin', async (req, res) => { })


module.exports = router