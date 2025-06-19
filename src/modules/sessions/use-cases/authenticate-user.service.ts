import { compare } from "bcryptjs";
import { PrismaUsersRepository } from "../../users/repositories/prisma/PrismaUsersRepository";
import { AuthenticateUserDTO } from "./authenticate-user.dto";
import { app } from "../../../lib/fastify";

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
    throw new Error("E-mail ou senha incorretos.");
  }
  const passwordMatch = await compare(password, user.password_hash);
  if (!passwordMatch) {
    app.log.error(`Tentativa de login falhou`);
    throw new Error("E-mail ou senha incorretos.");
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
