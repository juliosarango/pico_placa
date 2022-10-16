import express from 'express'
const cors = require('cors')

const routerApi = require('./routers/index')

const app = express()
const port = 3000

app.use(express.json())

routerApi(app)

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`)
})