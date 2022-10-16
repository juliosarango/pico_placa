import express from 'express'

const predictorRouter = require('../routers/predictor.router')

function routerApi(app:any) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/predictor', predictorRouter)
}

module.exports = routerApi