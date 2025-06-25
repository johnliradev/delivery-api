import { Address } from "../../../../generated/prisma";
import { createAppError } from "../../../../error/AppError";
import { PrismaAddressesRepository } from "../../repositories/prisma/prismaAddressesRepository";
import { app } from "../../../../lib/fastify";
import { PrismaUsersRepository } from "../../../users/repositories/prisma/PrismaUsersRepository";

export async function getAddressService(
  userId: string
): Promise<Address | null> {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    app.log.error(`Usuário não encontrado ${userId}`);
    throw createAppError("Usuário não encontrado", 404);
  }
  const address = await PrismaAddressesRepository.findByUserId(userId);
  if (!address) {
    return null;
  }
  return address;
}
