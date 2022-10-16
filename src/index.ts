import express from 'express'
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

const cors = require('cors')

const routerApi = require('./routers/index')

const app = express()
const port = 3000

app.use(express.json())

// swagger
app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerSetup))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// llamamos a nuestro router principal
routerApi(app)

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`)
})

export default app