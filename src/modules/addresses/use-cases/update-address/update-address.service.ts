import { createAppError } from "../../../../error/AppError";
import { PrismaAddressesRepository } from "../../repositories/prisma/prismaAddressesRepository";
import { AddressDTO } from "../../address.dto";
import { app } from "../../../../lib/fastify";

export async function updateAddressService(
  userId: string,
  addressId: string,
  data: AddressDTO
) {
  const address = await PrismaAddressesRepository.findById(addressId);
  if (!address || address.userId !== userId) {
    app.log.error(
      `Erro ao atualizar endereço: Endereço não encontrado - AddressID: ${addressId}, UserID: ${userId}`
    );
    throw createAppError("Endereço não encontrado", 404);
  }
  const updatedAddress = await PrismaAddressesRepository.update(addressId, {
    ...data,
  });
  app.log.info(
    `Endereço atualizado com sucesso - AddressID: ${addressId}, UserID: ${userId}`
  );
  return updatedAddress;
}
