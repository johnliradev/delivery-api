import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";

export async function getProfileService(userId: string): Promise<any> {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  const userProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  return userProfile;
}
