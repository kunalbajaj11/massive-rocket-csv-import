const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const jwtSecret = process.env.SECRET_KEY;

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // user exists check
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        jwt.sign(payload, jwtSecret, {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;