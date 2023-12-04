const UserModelEcom = require("../models/usermodelEcom");
const bcrypt = require("bcrypt")
require("dotenv").config()
const SALT_ROUND = +(process.env.SALT_ROUND)
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const user = req.body

    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    const newUser = new UserModelEcom(user)

    try {
        const emailExist = await UserModelEcom.findOne({
            email: user.email
        })
        if (emailExist) {
            return res.status(400).json({
                message: "Email already exist, try with another email"
            })
        }

        await newUser.save()
        return res.status(201).json({
            message: "User created successfully",
            result: user
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const user = await UserModelEcom.find({})
        return res.status(200).json({
            message: "Data fetched successfully",
            result: user,
            count: user.length
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateEcomUser = async (req, res, next) => {
    const id = req.params.id
    const updatedUser = req.body

    try {
        if (updatedUser.password !== "") {
            const salt = bcrypt.genSaltSync(SALT_ROUND);
            const hash = bcrypt.hashSync(updatedUser.password, salt);
            updatedUser.password = hash;
        }

        const findUser = await UserModelEcom.findOne({
            _id: id
        })

        if (!findUser) {
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        const test = await UserModelEcom.findByIdAndUpdate(id, updatedUser, { new: true })

        return res.status(200).json({
            message: "User updated successfully",
            result: test
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }

}

const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const findUser = await UserModelEcom.findOne({
            _id: id
        })

        if (!findUser) {
            return res.status(404).json({
                message: "User does not found"
            })
        }

        await UserModelEcom.findByIdAndDelete(id)
        return res.status(200).json({
            message: "User deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const userLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    try {
        const user = await UserModelEcom.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: "user doesn't exist"
            })
        }

        // To handle hash password 
        let credentials = user.password
        let result = bcrypt.compareSync(password, credentials)

        if (!result) {
            return res.status(500).json({
                message: "Incorrect password"
            })
        } else {
            const token = jwt.sign(
                { email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            )

            return res.status(200).json({
                message: "Login successful",
                token: token
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createUser, getAllUser, updateEcomUser, deleteUser, userLogin }