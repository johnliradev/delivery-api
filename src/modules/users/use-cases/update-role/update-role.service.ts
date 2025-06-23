import { createAppError } from "../../../../error/AppError";
import { Role } from "../../../../generated/prisma";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";

export default async function updateRoleService(id: string, role: Role) {
  const user = await PrismaUsersRepository.findById(id);
  if (!user) {
    throw createAppError("Usuário não encontrado", 404);
  }
  if (user.role === role) {
    throw createAppError("Usuário já possui este cargo", 400);
  }
  const updatedUser = await PrismaUsersRepository.updateUserRole(id, role);
  return updatedUser;
}
