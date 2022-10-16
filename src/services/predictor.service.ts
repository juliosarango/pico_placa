
const boom = require('@hapi/boom')
import * as config  from '../utils/config'

class PredictorService {

  /**
   * Función para obtener el día de la semana data la fecha.
   * 
   * @param date: Fecha de ingreso 
   * @param locale: Timezone
   * @returns String Retorna el día de la semana es español
   */

  obtenerDia(date:string, locale = 'es-EC') {
    return new Date(date + " 00:00").toLocaleDateString(locale, { timeZone: 'America/Guayaquil', weekday: 'long' });
  }  
  

  /**
   * Función para verificar si la hora ingresada está dentro del horario de restricciones del pico y placa
   * 
   * @param date string Fecha ingresada por el usuario
   * @param hour string Hora ingresada por el usuario
   * @returns Retona mensaje si está o no dentro del horario de restricción de pico y placa
   */

  enPicoYPlaca(date: string, hour: string) {

    let hora_ingreso = new Date(`${date} ${hour}`)    
    let pico_y_placa = false;

    for (const [periodo, desde, hasta] of config.horarios) {
      let inicio_pico = new Date(`${date} ${desde}`);
      let fin_pico = new Date(`${date} ${hasta}`);
      
      pico_y_placa = pico_y_placa || ( hora_ingreso >= inicio_pico && fin_pico >= hora_ingreso);

      return ( pico_y_placa ? config.PICO_PLACA : config.PICO_FUERA_HORARIO )
    }
    
  }
  
  /**
   * Función para verificar si un usuario está dentro del pico y placa
   * 
   * @param licence_plate string Número de placa del vehículo
   * @param date string Fecha ingresada para la consulta
   * @param time strign Hora ingresada para la consulta
   * @returns strign Retorna el mensaje de acuerdo a las validaciones realizadas
   */
  verificarPicoPlaca(licence_plate:String, date:string, time:string) {

    const ultimo_digito:number = Number(licence_plate.substring(6))

    const dia_semana:string = this.obtenerDia(date)       

    const es_feriado:boolean = config.feriados.includes(date)
            
    if ( dia_semana == "sábado" || dia_semana == "domingo") {
      return config.FIN_SEMANA
    }

    if (es_feriado) {
      return config.FERIADO
    }

    for (const [dia, digito1, digito2] of config.restricciones) {      
      if (dia == dia_semana && (digito1 == ultimo_digito || digito2 == ultimo_digito)) {        
        return this.enPicoYPlaca(date, time)
      }
    }    

    return config.SIN_PICO_PLACA
  }

}

module.exports = PredictorService 