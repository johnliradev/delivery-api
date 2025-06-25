import { createAppError } from "../../../../error/AppError";
import { PrismaAddressesRepository } from "../../repositories/prisma/prismaAddressesRepository";
import { AddressDTO } from "../../address.dto";

export async function updateAddressService(
  userId: string,
  addressId: string,
  data: AddressDTO
) {
  const address = await PrismaAddressesRepository.findById(addressId);
  if (!address || address.userId !== userId) {
    throw createAppError("Endereço não encontrado", 404);
  }
  return await PrismaAddressesRepository.update(addressId, {
    ...data,
  });
}
