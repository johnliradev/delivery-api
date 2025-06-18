import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório." })
    .min(3, "O nome deve ter no mínimo 3 caracteres."),
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email("O formato do e-mail é inválido."),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
});
export type CreateUserDTO = z.infer<typeof createUserSchema>;
