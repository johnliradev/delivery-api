import { app } from "../../../../lib/fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";

export async function getProfileService(userId: string): Promise<any> {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    app.log.error(`Erro ao buscar perfil: Usuário não encontrado`);
    throw new Error("Usuário não encontrado");
  }
  const userProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  console.log(userProfile);
  return userProfile;
}
