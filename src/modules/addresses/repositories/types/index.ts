export type CreateAddressRepositoryData = {
  userId: string;
  street: string;
  number: string;
  city: string;
  zipCode: string;
};
export type UpdateAddressRepositoryData = {
  street?: string;
  number?: string;
  city?: string;
  zipCode?: string;
};
