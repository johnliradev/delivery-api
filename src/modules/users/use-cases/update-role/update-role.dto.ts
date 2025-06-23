import { z } from "zod";

export const updateRoleSchema = z.object({
  role: z
    .enum(["CUSTOMER", "RESTAURANT", "ADMIN"], {
      required_error: "O cargo é obrigatório.",
      invalid_type_error: "O cargo deve ser CUSTOMER, RESTAURANT ou ADMIN.",
    })
    .refine((val) => val && val.trim() !== "", {
      message: "O cargo é obrigatório.",
    }),
});

export type UpdateRoleDTO = z.infer<typeof updateRoleSchema>;
