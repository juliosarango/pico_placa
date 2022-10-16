import express from 'express'
import { Request, Response, NextFunction, } from 'express';
const PredictorService = require('../services/predictor.service')
const validatorHandle = require('../middlewares/validator.handle')
const { predictorSchema } = require('../schemas/predictor.schema')

const router = express.Router()
const service = new PredictorService()

router.post('/',
  validatorHandle(predictorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { licence_plate, date, time } = req.body
      const result = await service.verificarPicoPlaca(licence_plate, date, time)      
      res.status(200).json(result)
    } catch(err) {
      console.log(err)
    }
  }

)

module.exports = router