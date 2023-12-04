const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config()

const user = require('./routes/user')

const app = express()

app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json({ extended: true, limit: "5mb" }))

app.use("/user", user)


// Connecting to Database 
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        app.listen(process.env.PORT, function () {
            console.log(`Server is running on port ${process.env.PORT}`)
            console.log("Connecting to Database")
        })
    }).catch((err) => console.log(err.message))