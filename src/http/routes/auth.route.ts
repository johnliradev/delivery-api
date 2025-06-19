import { FastifyInstance } from "fastify";
import { authenticateUserController } from "../../modules/sessions/use-cases/authenticate-user.controller";
export function authRouter(app: FastifyInstance) {
  app.post("/", authenticateUserController);
}
