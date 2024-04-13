
require('dotenv').config()

const express = require('express') 
const cors = require("cors")
const cookieParser = require('cookie-parser')
const apiRouter = require("./controllers/api")

const routerCustomer = require("./controllers/customer")
const routerUser = require("./controllers/user")
const routerAuth = require("./controllers/auth")

const error = require("./middleware/error")
const log = require("./middleware/log")
const auth = require("./middleware/auth")

const app = express() 

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(log.requestLogger)
app.use(auth.auth)
app.use(express.static('build'))
app.use(apiRouter)
app.use(routerCustomer)
app.use(routerUser)
app.use(routerAuth)

app.use(error.errorMiddleware)

module.exports = app
