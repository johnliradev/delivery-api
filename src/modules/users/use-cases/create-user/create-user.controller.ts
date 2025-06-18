import { FastifyReply, FastifyRequest } from "fastify";
import { createUserService } from "./create-user.service";
import { createUserSchema } from "./create-user.dto";
import { error } from "console";
export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = createUserSchema.safeParse(request.body);
  if (parseData.error) {
    return reply.code(400).send({
      message: "Erro de validação dos dados.",
      error: parseData.error.flatten(),
    });
  }
  await createUserService(parseData.data);
  return reply.code(201).send({
    message: "Usuario criado com sucesso.",
  });
}
