import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { RegisterPlugins } from "../http/plugins";

export const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

RegisterPlugins(app);

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      app.log.error(error);
      reply.status(401).send({ error: "Unauthorized" });
    }
  }
);
