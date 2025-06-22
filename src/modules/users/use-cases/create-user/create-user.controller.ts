import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "./create-user.service";
import { createUserSchema } from "./create-user.dto";
import { app } from "../../../../lib/fastify";
import { createAppError } from "../../../../error/AppError";
export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = createUserSchema.safeParse(request.body);
  if (parseData.error) {
    app.log.error(`Erro ao criar usuário: ${parseData.error.message}`);
    throw createAppError("Erro de validação dos dados.", 400);
  }
  await createUserService(parseData.data);
  app.log.info(`Usuário criado com sucesso`);
  return reply.code(201).send({
    message: "Usuário criado com sucesso.",
  });
}
