import hash from "bcryptjs";
import { CreateUserDTO } from "./create-user.dto";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { User } from "../../../../generated/prisma";

export async function createUserService(data: CreateUserDTO): Promise<User> {
  const existingUser = await PrismaUsersRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error("Esse e-mail já está cadastrado.");
  }
  const passwordHash = hash.hashSync(data.password, 8);
  const user = await PrismaUsersRepository.create({
    name: data.name,
    email: data.email,
    passwordHash: passwordHash,
  });
  return user;
}
