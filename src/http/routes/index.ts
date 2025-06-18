import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
export function Router(app: FastifyInstance) {
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
