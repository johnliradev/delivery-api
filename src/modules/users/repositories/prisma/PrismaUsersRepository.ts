import { prisma } from "../../../../lib/prisma";
import { User, Role } from "../../../../generated/prisma";
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
  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
  async updateUserRole(id: string, role: Role): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return user;
  },
};
