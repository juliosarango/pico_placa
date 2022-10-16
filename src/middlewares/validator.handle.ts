const boom = require('@hapi/boom')
import { Request, Response, NextFunction, } from 'express';
const { predictorSchema } = require('../schemas/predictor.schema')


/**
 * Función que captura los datos de ingreso y los envía a la validación a través del exquema 
 * definido 
 * @param schema Schema definido con los datos de ingreso
 * @returns Si existe error, retornas un badrequest, caso contrario see llama a la siguiente función
 * 
 */

function validatorHandle(schema: any) {
  return (req: Request, res: Response, next: NextFunction ) => {
    const data = req['body']
    const { error } = schema.validate(data, { abortEarly: false })

    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandle