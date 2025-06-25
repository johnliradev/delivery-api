import { createAppError } from "../../../../error/AppError";
import { Role } from "../../../../generated/prisma";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { app } from "../../../../lib/fastify";

export default async function updateRoleService(id: string, role: Role) {
  const user = await PrismaUsersRepository.findById(id);
  if (!user) {
    app.log.error(
      `Erro ao atualizar cargo: Usuário não encontrado - ID: ${id}`
    );
    throw createAppError("Usuário não encontrado", 404);
  }
  if (user.role === role) {
    app.log.warn(
      `Tentativa de atualizar para o mesmo cargo - ID: ${id}, cargo: ${role}`
    );
    throw createAppError("Usuário já possui este cargo", 400);
  }
  const updatedUser = await PrismaUsersRepository.updateUserRole(id, role);
  app.log.info(`Cargo atualizado com sucesso - ID: ${id}, novo cargo: ${role}`);
  return updatedUser;
}
