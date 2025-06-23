import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../../../../generated/prisma";
import updateRoleService from "./update-role.service";
import { updateRoleSchema } from "./update-role.dto";
import { app } from "../../../../lib/fastify";
import { createAppError } from "../../../../error/AppError";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";

export default async function updateRoleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const parseData = updateRoleSchema.parse(request.body);

  await updateRoleService(id, parseData.role as Role);
  return reply.status(200).send({
    message: "Cargo atualizado com sucesso",
  });
}
