const user = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Bad Request!" });
        }

        const existingUser = await user.findOne({ username });

        if (existingUser) {
            return res.status(404).json({ message: "User already exists!", })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({ username, password: hashedPassword })

        const response = await newUser.save();

        const token = jwt.sign({ userId: response._id }, process.env.SECRET_KEY);

        res.status(200).json({
            message: "Registration Successfull!",
            user: response,
            token: token
        })

    } catch (error) {
        console.log("Error in User Registration! \n", error);
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Bad Request!" });
        }

        const existingUser = await user.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "Unregistered User!", })
        }

        const matchedPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchedPassword) {
            return res.status(400).json({ message: "Unmatehed Password!" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);

        res.status(200).json({
            message: "Login Successfull!",
            user: existingUser,
            token: token
        });

    } catch (error) {
        console.log("Error in User Login! \n", error);
    }
}

module.exports = { userLogin, userRegister };