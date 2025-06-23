import { User, Role } from "../../../generated/prisma";
import { CreateUserRepositoryData } from "./types";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  create(data: CreateUserRepositoryData): Promise<User>;
  updateUserRole(id: string, role: Role): Promise<User>;
}
