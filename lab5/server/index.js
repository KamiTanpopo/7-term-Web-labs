require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const sequelize = require("./sequelize")
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startServer()

//for starting the server please write command: nodemon index.js