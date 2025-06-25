import { PrismaAddressesRepository } from "../../repositories/prisma/prismaAddressesRepository";
import { PrismaUsersRepository } from "../../../users/repositories/prisma/PrismaUsersRepository";
import { createAppError } from "../../../../error/AppError";
import { app } from "../../../../lib/fastify";
import { AddressDTO } from "../../address.dto";

export async function createAddressService(id: string, data: AddressDTO) {
  const user = await PrismaUsersRepository.findById(id);
  if (!user) {
    app.log.error(`Usuário não encontrado ${id}`);
    throw createAppError("Usuário não encontrado", 404);
  }
  const address = await PrismaAddressesRepository.create({
    userId: id,
    street: data.street,
    number: data.number,
    city: data.city,
    zipCode: data.zipCode,
  });
  return address;
}
