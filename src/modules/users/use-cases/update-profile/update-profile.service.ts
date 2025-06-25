import { createAppError } from "../../../../error/AppError";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { UpdateProfileDTO } from "./update-profile.dto";

export async function updateProfileService(id: string, data: UpdateProfileDTO) {
  const user = await PrismaUsersRepository.findById(id);
  if (!user) {
    throw createAppError("Usuário não encontrado", 404);
  }
  if (data.email) {
    const userWithSameEmail = await PrismaUsersRepository.findByEmail(
      data.email
    );
    if (userWithSameEmail) {
      throw createAppError("E-mail já em uso", 400);
    }
  }
  if (data.phone) {
    const userWithSamePhone = await PrismaUsersRepository.findByPhone(
      data.phone
    );
    if (userWithSamePhone) {
      throw createAppError("Telefone já em uso", 400);
    }
  }
  const updatedUser = await PrismaUsersRepository.updateProfile(id, data);
  return updatedUser;
}
