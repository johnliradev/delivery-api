import { FastifyReply, FastifyRequest } from "fastify";
import { deleteUserService } from "./delete-user.service";
import { app } from "../../../../lib/fastify";

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  await deleteUserService(id);
  app.log.info(`Controller: Usuário deletado com sucesso - ID: ${id}`);
  return reply.status(204).send({ message: "Usuário deletado com sucesso" });
}
