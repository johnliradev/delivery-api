import { compare } from "bcryptjs";
import { PrismaUsersRepository } from "../../users/repositories/prisma/PrismaUsersRepository";
import { AuthenticateUserDTO } from "./authenticate-user.dto";
import { app } from "../../../lib/fastify";
import { createAppError } from "../../../error/AppError";

export async function authenticateUserService({
  email,
  password,
}: AuthenticateUserDTO): Promise<{
  token: string;
  user: { name: string; email: string };
}> {
  const user = await PrismaUsersRepository.findByEmail(email);
  if (!user) {
    app.log.error(`Tentativa de login falhou`);
    throw createAppError("E-mail ou senha incorretos.", 401);
  }
  const passwordMatch = await compare(password, user.password_hash);
  if (!passwordMatch) {
    app.log.error(`Tentativa de login falhou`);
    throw createAppError("E-mail ou senha incorretos.", 401);
  }

  const token = await app.jwt.sign(
    {
      role: user.role,
    },
    { sub: user.id, expiresIn: "1h" }
  );
  const userResponse = {
    name: user.name,
    email: user.email,
  };

  return {
    token,
    user: userResponse,
  };
}
