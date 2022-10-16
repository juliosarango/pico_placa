/**
 * Definimos el esquema con los datos de entrada
 */

const Joi = require('@hapi/joi')

const licence_plate = Joi.string().min(7).max(7)
const date = Joi.string().min(10).max(10)
const time = Joi.string().min(5).max(8)


const predictorSchema = Joi.object({
  licence_plate: licence_plate.required(),
  date: date.required(),
  time: time.required()
})


module.exports = { predictorSchema }