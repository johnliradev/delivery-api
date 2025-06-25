export type CreateUserRepositoryData = {
  name: string;
  email: string;
  passwordHash: string;
};
export type UpdateProfileRepositoryData = {
  name?: string;
  email?: string;
  phone?: string;
};
