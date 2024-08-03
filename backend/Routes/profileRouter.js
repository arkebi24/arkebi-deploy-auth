const ensureAuthenticated = require('../Middlewares/profile');
const UserModel = require("../Schema/User");


const router = require('express').Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    const email = req.user.email;
    try {
        const user = await UserModel.findOne({ email });
        res.status(200).json([
            {
                name: user.name,
                email: user.email,
                country: user.country,
                phonenumber: user.phonenumber
            }
        ])
    } catch (error) { 
        res.status(500)
            .json({
                message: `Internal server errror`,
                success: false
            })
    }
});

module.exports = router;