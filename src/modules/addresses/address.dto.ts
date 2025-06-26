import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(1, "Nome do endereço é obrigatório")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  street: z
    .string()
    .min(1, "Rua é obrigatória")
    .max(255, "Rua deve ter no máximo 255 caracteres"),
  number: z
    .string()
    .min(1, "Número do endereço é obrigatório")
    .max(10, "Número do endereço deve ter no máximo 10 caracteres"),
  city: z
    .string()
    .min(1, "Cidade é obrigatória")
    .max(255, "Cidade deve ter no máximo 255 caracteres"),
  state: z
    .string()
    .min(1, "Estado é obrigatório")
    .max(255, "Estado deve ter no máximo 255 caracteres"),
  zipCode: z
    .string()
    .min(1, "CEP é obrigatório")
    .max(10, "CEP deve ter no máximo 10 caracteres"),
});

export type AddressDTO = z.infer<typeof addressSchema>;
