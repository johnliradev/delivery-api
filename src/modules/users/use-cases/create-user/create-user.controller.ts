import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "./create-user.service";
import { createUserSchema } from "./create-user.dto";
import { app } from "../../../../lib/fastify";
import { createAppError } from "../../../../error/AppError";
export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = createUserSchema.parse(request.body);

  await createUserService(parseData);
  app.log.info(`Usuário criado com sucesso`);
  return reply.code(201).send({
    message: "Usuário criado com sucesso.",
  });
}
