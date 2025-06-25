import { User, Role } from "../../../generated/prisma";
import { CreateUserRepositoryData, UpdateProfileRepositoryData } from "./types";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  create(data: CreateUserRepositoryData): Promise<User>;
  updateUserRole(id: string, role: Role): Promise<User>;
  updateProfile(id: string, data: UpdateProfileRepositoryData): Promise<User>;
  delete(id: string): Promise<void>;
}
