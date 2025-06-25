import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateProfileDTO } from "./update-profile.dto";
import { updateProfileService } from "./update-profile.service";
import { createAppError } from "../../../../error/AppError";

export default async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { name, email, phone } = request.body as UpdateProfileDTO;
  if (!name && !email && !phone) {
    throw createAppError("Nome, e-mail ou telefone não informados", 400);
  }
  const updatedUser = await updateProfileService(id, { name, email, phone });
  return reply.status(200).send(updatedUser);
}
