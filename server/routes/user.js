const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router()
const { createUser, getAllUser, updateEcomUser, deleteUser, userLogin } = require("../controller/userController")
const { checkAuth, checkAdmin } = require("../middleware/check-auth")

router.post("/create-user", createUser)
router.get("/get-users", checkAuth, getAllUser)
router.patch("/update-user/:id", updateEcomUser)
router.delete("/delete-user/:id", deleteUser)
router.post("/login", userLogin)

module.exports = router
