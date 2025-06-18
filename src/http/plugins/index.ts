import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { Router } from "../routes/index";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
// Function to register plugins for app instance
const swaggerOptions = {
  openapi: {
    info: {
      title: "Delivery API",
      description: "Documentação da API de Delivery",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
};
export async function RegisterPlugins(app: FastifyInstance) {
  // Register CORS plugin
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  // Register Swagger plugin
  await app.register(swagger, swaggerOptions);
  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
  // Register Routes
  await app.register(Router);
}
