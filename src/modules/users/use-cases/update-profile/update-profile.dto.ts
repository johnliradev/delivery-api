import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
