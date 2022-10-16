import express from 'express'
import { Request, Response, NextFunction, } from 'express';
const PredictorService = require('../services/predictor.service')
const validatorHandle = require('../middlewares/validator.handle')
const { predictorSchema } = require('../schemas/predictor.schema')

const router = express.Router()
const service = new PredictorService()

/**
 * Post Predictor
 * @openapi
 * /predictor:
 *    post:
 *      tags:
 *        - pico y placa
 *      summary: "Verificar si un usuario puede o no circular en una fecha dada"
 *      description: Verificar si un usuario puede circular o no dentro del distrito metropolitano de Quito
 *      requestBody:
 *          content: 
 *            application/json:
 *              schema:
 *                {
 *                  "licence_plate":"",
 *                  "date": "",
 *                  "time": ""
 *                }
 *      responses:
 *        '200':
 *          description: Retorna el resultado de las validaciones
 *        '422':
 *          description: Error de validación
 */

router.post('/',
  validatorHandle(predictorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { licence_plate, date, time } = req.body
      const result = await service.verificarPicoPlaca(licence_plate, date, time)      
      return res.status(200).json({msg: result})
    } catch(err) {
      return res.status(500).json({msg: "Error"})
    }
  }

)

module.exports = router