import request from "supertest"
import app from '../index'
import * as config  from '../utils/config'


describe("test predictor route", () => {
  test("Validacion de pico y placa - dentro de horario", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "abc1231",
      "date": "2022-10-17", 
      "time": "08:31"
    })    
    expect(res.body.msg).toEqual(config.PICO_PLACA)
  })

  test("Validacion de pico y placa - dentro de horario", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "pcs1157",
      "date": "2022-10-20", 
      "time": "08:31"
    })    
    expect(res.body.msg).toEqual(config.PICO_PLACA)
  })

  test("Validacion de pico y placa - fuera de horario", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "pcs1157",
      "date": "2022-10-20", 
      "time": "09:31"
    })    
    expect(res.body.msg).toEqual(config.PICO_FUERA_HORARIO)
  })

  test("Validacion de pico y placa - Sin restricción", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "pcs1157",
      "date": "2022-10-21", 
      "time": "08:31"
    })    
    expect(res.body.msg).toEqual(config.SIN_PICO_PLACA)
  })

  test("Validacion de pico y placa - Feriados", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "pcs1157",
      "date": "2022-08-10", 
      "time": "08:31"
    })    
    expect(res.body.msg).toEqual(config.FERIADO)
  })

  test("Validacion de pico y placa - Fin de semana", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({
      "licence_plate": "pcs1157",
      "date": "2022-10-15", 
      "time": "08:31"
    })    
    expect(res.body.msg).toEqual(config.FIN_SEMANA)
  })

  test("Validacion de pico y placa - Faltan datos", async() => {
    const res = await request(app).post("/api/v1/predictor/").send({      
      "date": "2022-10-20", 
      "time": "09:31"
    })    
    expect(res.status).toEqual(500)
  })
})