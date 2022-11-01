const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware.js")
const {connectDB} = require('./config/db.js')
const port = process.env.PORT || 5000

connectDB()

const app = express()

//middleware to accept json from res POST
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use("/api/goals", require('./routes/goalRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

