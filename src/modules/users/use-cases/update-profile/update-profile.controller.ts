import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateProfileDTO } from "./update-profile.dto";
import { updateProfileService } from "./update-profile.service";
import { createAppError } from "../../../../error/AppError";
import { app } from "../../../../lib/fastify";

export default async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { name, email, phone } = request.body as UpdateProfileDTO;
  if (!name && !email && !phone) {
    app.log.warn(
      `Controller: Tentativa de atualizar perfil sem dados - ID: ${id}`
    );
    throw createAppError("Nome, e-mail ou telefone não informados", 400);
  }
  const updatedUser = await updateProfileService(id, { name, email, phone });
  app.log.info(`Controller: Perfil atualizado com sucesso - ID: ${id}`);
  return reply.status(200).send(updatedUser);
}
