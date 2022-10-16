
// definición de restricciones por días
export let restricciones: [string, number, number][]
restricciones = [
  ["lunes", 1, 2],
  ["martes", 3, 4],
  ["miércoles", 5, 6],
  ["jueves", 7, 8],
  ["viernes", 9, 0]
]

// definición de feriados para el año 2022
export let feriados: string[] = 
[
  "2022-01-01",
  "2022-02-28",
  "2022-03-01",
  "2022-04-15",
  "2022-05-01",
  "2022-05-24",
  "2022-08-10",
  "2022-10-09",
  "2022-11-02",
  "2022-11-03",
  "2022-12-06",
  "2022-12-25"
]

// definición de horarios y restricciones
export const horarios:[string,string, string][] = [
  ["primer_horario",  "06:00:00", "09:30:00"],
  ["segundo_horario", "16:00:00", "21:00:00"]
]

// definimos mensajes 
export const FERIADO = "La fecha ingresada es feriado, puede circular libremente todo el día."
export const FIN_SEMANA = "La fecha ingresada pertenece a un fin de semana, puede circular libremente todo el día"
export const PICO_FUERA_HORARIO = "Usted se encuentra en el día de restricción, sin embargo puede circular por que se cuentra fuera del horario de restricción, tenga cuidado."
export const PICO_PLACA = "Lo sentimos, usted se encuentra circulando dentro del periodo de pico y placa, su vehículo será retenido y perderá puntos en su licencia de conducir"
export const SIN_PICO_PLACA = "No tiene restricciones, puede circular todo el día"
