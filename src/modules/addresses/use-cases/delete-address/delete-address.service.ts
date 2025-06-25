import { createAppError } from "../../../../error/AppError";
import { app } from "../../../../lib/fastify";
import { PrismaUsersRepository } from "../../../users/repositories/prisma/PrismaUsersRepository";
import { PrismaAddressesRepository } from "../../repositories/prisma/prismaAddressesRepository";

export async function deleteAddressService(userId: string, addressId: string) {
  const user = await PrismaUsersRepository.findById(userId);
  if (!user) {
    app.log.error(`Usuário não encontrado ${userId}`);
    throw createAppError("Usuário não encontrado", 404);
  }
  const address = await PrismaAddressesRepository.findById(addressId);
  if (!address || address.userId !== userId) {
    app.log.error(`Endereço não encontrado ${addressId}`);
    throw createAppError("Endereço não encontrado", 404);
  }
  return await PrismaAddressesRepository.delete(addressId);
}
