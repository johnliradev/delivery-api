import { Address } from "../../../../generated/prisma";
import { prisma } from "../../../../lib/prisma";
import { IAddressesRepository } from "../IAddressesRepository";
import {
  CreateAddressRepositoryData,
  UpdateAddressRepositoryData,
} from "../types";

export const PrismaAddressesRepository: IAddressesRepository = {
  async findByUserId(userId: string): Promise<Address[]> {
    const address = await prisma.address.findMany({
      where: {
        userId,
      },
    });
    return address;
  },
  async findById(id: string): Promise<Address> {
    const address = await prisma.address.findUniqueOrThrow({
      where: { id },
    });
    return address;
  },
  async create(data: CreateAddressRepositoryData): Promise<Address> {
    const address = await prisma.address.create({
      data,
    });
    return address;
  },
  async update(
    id: string,
    data: UpdateAddressRepositoryData
  ): Promise<Address> {
    const address = await prisma.address.update({
      where: { id },
      data,
    });
    return address;
  },
  async delete(id: string): Promise<void> {
    await prisma.address.delete({
      where: { id },
    });
  },
};
