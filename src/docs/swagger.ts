import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Pico y Placa Predictor API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1/",
    },
  ],
  components: {    
    schemas: {
      predictorSchema: {
        type: "object",
        required: ["licence_plate", "date", "time"],
        properties: {
          licence_plate: {
            type: "string",
          },
          date: {
            type: "string",
          },
          time: {
            type: "string",
          },
        },
      },
      
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routers/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);