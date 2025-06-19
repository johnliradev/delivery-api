import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "./create-user.service";
import { createUserSchema } from "./create-user.dto";
import { app } from "../../../../lib/fastify";
export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = createUserSchema.safeParse(request.body);
  if (parseData.error) {
    app.log.error(`Erro ao criar usuário: ${parseData.error.message}`);
    return reply.code(400).send({
      message: "Erro de validação dos dados.",
      error: parseData.error.flatten(),
    });
  }
  await createUserService(parseData.data);
  app.log.info(`Usuário criado com sucesso`);
  return reply.code(201).send({
    message: "Usuário criado com sucesso.",
  });
}
