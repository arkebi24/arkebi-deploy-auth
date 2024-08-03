const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Schema/User");


const register = async (req, res) => {
    try {
        const { name, email, password, country, phonenumber } = req.body;
        const user = await UserModel.findOne({ email }); //if user exists
        if (user) {
            return res.status(409).json({ message: `User email already registered, please login`, success: false });
        }
        const userModel = new UserModel({ name, email, password, country, phonenumber });
        userModel.password = await bcrypt.hash(userModel.password, 10)
        await userModel.save();
        res.status(201).json({
            message: "Registered successfully",
            success: true
        })
    } catch (error) {
        res.status(500)
            .json({
                message: `Internal server errror`,
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Your email or password is wrong! Please check';
        if (!user) {    //if user is not registered
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: '24h' }
        )
        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            sameSite: 'Strict' // Adjust based on your CSRF protection strategy
        });
        req.token = jwtToken
        req.user = user
        res.status(200)
            .json({
                message: "Logged in Successfully",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        if (!token) res.status(400).send('Token not provided');
        res.cookie('jwt', '', {
            httpOnly: true,
            sameSite: 'Strict', // Adjust based on your CSRF protection strategy
            expires: new Date(0) // Set expiration date to a past date
          });
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }


}

module.exports = {
    register,
    login,
    logout
}