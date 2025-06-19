import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userRouter } from "./user.routes";
import { authRouter } from "./auth.route";
export function Router(app: FastifyInstance) {
  app.register(userRouter, {
    prefix: "/users",
  });
  app.register(authRouter, {
    prefix: "/session",
  });
  app.get(
    "/",
    {
      schema: {
        description: "Rota de acesso à API",
        tags: ["Home"],
        response: {
          200: {
            description: "Retorna uma mensagem de boas-vindas",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      app.log.info("Acessed route: /");
      return reply.status(200).send({
        message:
          "Bem-vindo à API de Gerenciamento de Tarefas! Acesse /docs para ter acesso a informações da API.",
      });
    }
  );
}
