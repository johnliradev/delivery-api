import { createAppError } from "../../../../error/AppError";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { UpdateProfileDTO } from "./update-profile.dto";
import { app } from "../../../../lib/fastify";

export async function updateProfileService(id: string, data: UpdateProfileDTO) {
  const user = await PrismaUsersRepository.findById(id);
  if (!user) {
    app.log.error(
      `Erro ao atualizar perfil: Usuário não encontrado - ID: ${id}`
    );
    throw createAppError("Usuário não encontrado", 404);
  }
  if (data.email) {
    const userWithSameEmail = await PrismaUsersRepository.findByEmail(
      data.email
    );
    if (userWithSameEmail && userWithSameEmail.id !== id) {
      app.log.error(
        `Erro ao atualizar perfil: E-mail já em uso - ID: ${id}, email: ${data.email}`
      );
      throw createAppError("E-mail já em uso", 400);
    }
  }
  if (data.phone) {
    const userWithSamePhone = await PrismaUsersRepository.findByPhone(
      data.phone
    );
    if (userWithSamePhone && userWithSamePhone.id !== id) {
      app.log.error(
        `Erro ao atualizar perfil: Telefone já em uso - ID: ${id}, phone: ${data.phone}`
      );
      throw createAppError("Telefone já em uso", 400);
    }
  }
  const updatedUser = await PrismaUsersRepository.updateProfile(id, data);
  app.log.info(`Perfil atualizado com sucesso - ID: ${id}`);
  return updatedUser;
}
