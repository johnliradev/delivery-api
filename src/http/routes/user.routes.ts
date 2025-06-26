import { FastifyInstance } from "fastify";
import { createUserController } from "../../modules/users/use-cases/create-user/create-user.controller";
import { getProfileController } from "../../modules/users/use-cases/get-profile/get-profile.controller";
import updateRoleController from "../../modules/users/use-cases/update-role/update-role.controller";
import updateProfileController from "../../modules/users/use-cases/update-profile/update-profile.controller";
import { getAddressController } from "../../modules/addresses/use-cases/get-address/get-address.controller";
import { createAddressController } from "../../modules/addresses/use-cases/create-address/create-address.controller";
import { deleteAddressController } from "../../modules/addresses/use-cases/delete-address/delete-address.controller";
import { updateAddressController } from "../../modules/addresses/use-cases/update-address/update-address.controller";
import { deleteUserController } from "../../modules/users/use-cases/delete-user/delete-user.controller";
export function userRouter(app: FastifyInstance) {
  // Criar usuário
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
  // Criar endereço do usuário
  app.post(
    "/:id/address",
    {
      schema: {
        summary: "Criar endereço do usuário",
        description: "Cria um novo endereço para o usuário autenticado.",
        tags: ["Addresses"],
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID do usuário" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string", description: "Nome do endereço" },
            street: { type: "string", description: "Nome da rua" },
            number: { type: "string", description: "Número" },
            city: { type: "string", description: "Cidade" },
            state: { type: "string", description: "Estado" },
            zipCode: { type: "string", description: "CEP" },
          },
          required: ["name", "street", "number", "city", "state", "zipCode"],
        },
      },
      preHandler: [app.authenticate],
    },
    createAddressController
  );
  // Obter perfil do usuário autenticado
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
                  phone: { type: "string" },
                  role: { type: "string" },
                  createdAt: { type: "string", format: "date-time" },
                  address: {
                    type: "array",
                    nullable: true,
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        state: { type: "string" },
                        street: { type: "string" },
                        number: { type: "string" },
                        city: { type: "string" },
                        zipCode: { type: "string" },
                      },
                    },
                  },
                },
                required: [
                  "id",
                  "name",
                  "email",
                  "role",
                  "createdAt",
                  "address",
                ],
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
  // Obter endereço do usuário
  app.get(
    "/:id/address",
    {
      schema: {
        summary: "Obter endereço do usuário",
        description: "Retorna um endereço específico do usuário autenticado.",
        tags: ["Addresses"],
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID do usuário" },
            userId: { type: "string" },
          },
          required: ["id"],
        },
        response: {
          200: {
            description: "Resposta de sucesso com os dados do endereço.",
            type: "object",
            properties: {
              address: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  street: { type: "string" },
                  number: { type: "string" },
                  city: { type: "string" },
                  zipCode: { type: "string" },
                },
              },
              userId: { type: "string" },
            },
          },
          401: {
            description: "Erro de autenticação",
            type: "object",
            properties: {
              error: { type: "string" },
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
      preHandler: [app.authenticate],
    },
    getAddressController
  );
  // Atualizar cargo do usuário
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
      preHandler: [app.authenticate],
    },
    updateRoleController
  );
  // Atualizar perfil do usuário
  app.patch(
    "/:id/profile",
    {
      schema: {
        summary: "Atualizar perfil do usuário",
        description:
          "Permite que um usuário autenticado atualize seu nome, e-mail e/ou telefone. O e-mail e o telefone devem ser únicos no sistema.",
        tags: ["Users"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID do usuário a ser atualizado",
            },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Novo nome do usuário",
              nullable: true,
            },
            email: {
              type: "string",
              format: "email",
              description: "Novo e-mail do usuário",
              nullable: true,
            },
            phone: {
              type: "string",
              description: "Novo telefone do usuário",
              nullable: true,
            },
          },
          description:
            "Dados para atualização do perfil. Pelo menos um dos campos deve ser informado.",
          minProperties: 1,
        },
        response: {
          200: {
            description: "Perfil atualizado com sucesso",
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
              phone: { type: "string", nullable: true },
              createdAt: { type: "string", format: "date-time" },
            },
          },
          400: {
            description:
              "Erro de validação dos dados, e-mail ou telefone já em uso",
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
          404: {
            description: "Usuário não encontrado",
            type: "object",
            properties: {
              statusCode: { type: "number" },
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
      preHandler: [app.authenticate],
    },
    updateProfileController
  );
  // Deletar endereço do usuário
  app.delete(
    "/:id/address/:addressId",
    {
      schema: {
        summary: "Deletar endereço do usuário",
        description: "Remove um endereço específico do usuário autenticado.",
        tags: ["Addresses"],
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID do usuário" },
            addressId: { type: "string", description: "ID do endereço" },
          },
          required: ["id", "addressId"],
        },
        response: {
          200: {
            description: "Endereço deletado com sucesso",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          401: {
            description: "Erro de autenticação",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          404: {
            description: "Endereço ou usuário não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
      preHandler: [app.authenticate],
    },
    deleteAddressController
  );
  // Atualizar endereço do usuário
  app.put(
    "/:id/address/:addressId",
    {
      schema: {
        summary: "Atualizar endereço do usuário",
        description: "Permite que um usuário autenticado atualize um endereço.",
        tags: ["Addresses"],
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID do usuário" },
            addressId: { type: "string", description: "ID do endereço" },
          },
          required: ["id", "addressId"],
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string", description: "Nome do endereço" },
            street: {
              type: "string",
              description: "Nome da rua",
              nullable: true,
            },
            number: { type: "string", description: "Número", nullable: true },
            city: { type: "string", description: "Cidade", nullable: true },
            state: { type: "string", description: "Estado", nullable: true },
            zipCode: { type: "string", description: "CEP", nullable: true },
          },
          minProperties: 1,
        },
        response: {
          200: {
            description: "Endereço atualizado com sucesso",
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              street: { type: "string" },
              number: { type: "string" },
              city: { type: "string" },
              zipCode: { type: "string" },
              userId: { type: "string" },
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
          401: {
            description: "Erro de autenticação",
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          404: {
            description: "Endereço ou usuário não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
      preHandler: [app.authenticate],
    },
    updateAddressController
  );
  // Deletar usuário
  app.delete(
    "/:id",
    {
      schema: {
        summary: "Deletar usuário",
        description: "Remove um usuário específico do sistema.",
        tags: ["Users"],
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
          required: ["Authorization"],
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID do usuário" },
          },
          required: ["id"],
        },
      },
      preHandler: [app.authenticate],
    },
    deleteUserController
  );
}
