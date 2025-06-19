import { FastifyInstance } from "fastify";
import { authenticateUserController } from "../../modules/sessions/use-cases/authenticate-user.controller";
export function authRouter(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        summary: "Autenticar um usuário",
        description:
          "Esta rota autentica um usuário com base no e-mail e senha, retornando um token JWT em caso de sucesso.",
        tags: ["Sessions"],

        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },

        response: {
          200: {
            description: "Autenticação bem-sucedida.",
            type: "object",
            properties: {
              message: { type: "string" },
              token: { type: "string" },
              user: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
              },
            },
          },
          400: {
            description: "Erro de validação nos dados enviados.",
            type: "object",
            properties: {
              message: { type: "string" },
              errors: { type: "object" },
            },
          },
          401: {
            description: "Erro de autenticação. E-mail ou senha incorretos.",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    authenticateUserController
  );
}
