import { createAppError } from "../../../../error/AppError";
import { app } from "../../../../lib/fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";

export async function getProfileService(userId: string): Promise<any> {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    app.log.error(`Erro ao buscar perfil: Usuário não encontrado`);
    throw createAppError("Usuário não encontrado", 404);
  }
  const userProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
  return userProfile;
}
