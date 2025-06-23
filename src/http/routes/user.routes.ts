import { FastifyInstance } from "fastify";
import { createUserController } from "../../modules/users/use-cases/create-user/create-user.controller";
import { getProfileController } from "../../modules/users/use-cases/get-profile/get-profile.controller";
import updateRoleController from "../../modules/users/use-cases/update-role/update-role.controller";
export function userRouter(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        summary: "Rota para criar um usuário",
        description:
          "Esta rota permite criar um novo usuário no sistema. O usuário deve fornecer um nome e um e-mail válido. O e-mail deve ser único, caso contrário, a criação falhará.",
        tags: ["Users"],
        response: {
          201: {
            description: "Retorna os dados do usuário criado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            description: "Erro de validação dos dados",
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
          409: {
            description: "E-mail já cadastrado",
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    createUserController
  );
  app.get(
    "/me",
    {
      schema: {
        summary: "Obter perfil do usuário autenticado",
        description:
          "Esta rota retorna as informações do perfil do usuário que está a fazer a requisição, com base no token JWT fornecido.",
        tags: ["Users"],

        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },

        response: {
          200: {
            description: "Resposta de sucesso com os dados do perfil.",
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  role: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
          401: {
            description:
              "Erro de autenticação. O token está em falta, é inválido ou expirou.",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          404: {
            description:
              "Erro: o utilizador associado ao token não foi encontrado na base de dados.",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
      preHandler: [app.authenticate],
    },
    getProfileController
  );
  app.patch(
    "/:id/role",
    {
      schema: {
        summary: "Atualizar cargo do usuário",
        description:
          "Esta rota permite atualizar o cargo de um usuário específico. O cargo pode ser CUSTOMER, RESTAURANT ou ADMIN.",
        tags: ["Users"],
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            role: {
              type: "string",
              enum: ["CUSTOMER", "RESTAURANT", "ADMIN"],
            },
          },
          required: ["role"],
        },
        response: {
          200: {
            description: "Cargo atualizado com sucesso",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            description: "Erro de validação dos dados",
            type: "object",
            properties: {
              message: { type: "string" },
              errors: { type: "object" },
            },
          },
          404: {
            description: "Usuário não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    updateRoleController
  );
}
