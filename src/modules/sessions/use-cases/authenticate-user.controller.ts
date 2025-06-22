import { FastifyReply, FastifyRequest } from "fastify";
import { authenticateUserSchema } from "./authenticate-user.dto";
import { authenticateUserService } from "./authenticate-user.service";
import { app } from "../../../lib/fastify";
import { createAppError } from "../../../error/AppError";

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parseData = authenticateUserSchema.safeParse(request.body);
  if (parseData.error) {
    app.log.error(`Erro ao autenticar usuário: ${parseData.error.message}`);
    throw createAppError("Erro de validação dos dados.", 400);
  }
  const { token, user } = await authenticateUserService(parseData.data);
  app.log.info(`Usuário autenticado com sucesso`);
  return reply.code(200).send({
    message: "Autenticação realizada com sucesso.",
    token,
    user,
  });
}
