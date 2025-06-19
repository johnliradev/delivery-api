import { FastifyInstance } from "fastify";
import { createUserController } from "../../modules/users/use-cases/create-user/create-user.controller";
import { getProfileController } from "../../modules/users/use-cases/get-profile/get-profile.controller";
export function userRouter(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        description: "Rota para criar um usuário",
        tags: ["Users"],
        response: {
          201: {
            description: "Retorna os dados do usuário criado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    createUserController
  );
  app.get("/me", { preHandler: [app.authenticate] }, getProfileController);
}
