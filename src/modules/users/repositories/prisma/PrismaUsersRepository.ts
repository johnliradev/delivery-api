import { prisma } from "../../../../lib/prisma";
import { User } from "../../../../generated/prisma";
import { IUsersRepository } from "../IUsersRepository";
import { CreateUserRepositoryData } from "../types/index";

export const PrismaUsersRepository: IUsersRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  async create(data: CreateUserRepositoryData): Promise<User> {
    const { name, email, passwordHash } = data;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: passwordHash,
      },
    });
    return user;
  },
};
