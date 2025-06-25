import { Address } from "../../../generated/prisma";
import {
  CreateAddressRepositoryData,
  UpdateAddressRepositoryData,
} from "./types";

export interface IAddressesRepository {
  findByUserId(userId: string): Promise<Address[]>;
  findById(id: string): Promise<Address>;
  create(data: CreateAddressRepositoryData): Promise<Address>;
  update(id: string, data: UpdateAddressRepositoryData): Promise<Address>;
  delete(id: string): Promise<void>;
}
