import { FastifyReply, FastifyRequest } from "fastify";
import { authenticateUserSchema } from "./authenticate-user.dto";
import { authenticateUserService } from "./authenticate-user.service";

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = authenticateUserSchema.safeParse(request.body);
  if (parseData.error) {
    return reply.code(400).send({
      message: "Erro de validação dos dados.",
      error: parseData.error.flatten(),
    });
  }
  const { token, user } = await authenticateUserService(parseData.data);
  return reply.code(200).send({
    message: "Autenticação realizada com sucesso.",
    token,
    user,
  });
}
