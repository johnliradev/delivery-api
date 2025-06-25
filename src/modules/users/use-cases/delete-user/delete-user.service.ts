import { createAppError } from "../../../../error/AppError";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { app } from "../../../../lib/fastify";

export async function deleteUserService(userId: string) {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    app.log.error(
      `Erro ao deletar usuário: Usuário não encontrado - ID: ${userId}`
    );
    throw createAppError("Usuário não encontrado", 404);
  }
  if (user.role === "ADMIN") {
    app.log.warn(`Tentativa de deletar usuário admin - ID: ${userId}`);
    throw createAppError("Usuário admin não pode ser deletado", 403);
  }
  await PrismaUsersRepository.delete(userId);
  app.log.info(`Usuário deletado com sucesso - ID: ${userId}`);
}
