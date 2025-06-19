import { z } from "zod";

export const authenticateUserSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email("O formato do e-mail é inválido."),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(8, "A senha deve ter no mínimo 8 caracteres."),
});
export type AuthenticateUserDTO = z.infer<typeof authenticateUserSchema>;
