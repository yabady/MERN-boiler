const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware.js")
const port = process.env.PORT || 5000

const app = express()

//middleware to accept json from res POST
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use("/api/goals", require('./routes/goalRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

