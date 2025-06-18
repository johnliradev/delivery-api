import { Role } from "../../../../generated/prisma";

export type CreateUserRepositoryData = {
  name: string;
  email: string;
  passwordHash: string;
};
