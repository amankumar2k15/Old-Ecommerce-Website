const jwt = require("jsonwebtoken");
require("dotenv").config()
const UserModelEcom = require("../models/usermodelEcom")

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY);
        next()

    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized",
            code: 403
        })
    }

}

const checkAdmin = async (req, res, next) => {

    try {
        const email = req.body.email
        const token = req.headers.authorization.split(" ")[1];
        const key = jwt.verify(token, process.env.SECRET_KEY)
        console.log("key", key)

        const user = await UserModelEcom.findOne({
            email: key.email
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                code: 404
            })
        }

        if (user.type === "admin") {
            next()
        } else {
            return res.status(403).json({
                message: "You are not authorized to access this route",
                code: 403
            })
        }

    } catch (err) {
        return res.status(403).json({
            message: "Unathorized",
            code: 403
        })
    }
}

module.exports = { checkAuth, checkAdmin }