export type CreateAddressRepositoryData = {
  userId: string;
  name: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
};
export type UpdateAddressRepositoryData = {
  name?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};
