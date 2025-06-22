import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../error/AppError";
export const globalErrorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!reply || reply.sent) {
    request.log.error(
      error,
      "globalErrorHandler foi chamado mas a resposta já foi enviada ou é inválida."
    );
    return;
  }

  if (error instanceof ZodError) {
    request.log.warn(
      { issues: error.flatten().fieldErrors },
      "Erro de validação de dados recebidos."
    );
    return reply.status(400).send({
      message: "Erro de validação dos dados.",
      errors: error.flatten(),
    });
  }

  if ("isAppError" in error && error.isAppError === true) {
    const appError = error as AppError;
    return reply
      .status(appError.statusCode)
      .send({ message: appError.message });
  }

  request.log.error(error, "Erro interno do servidor não tratado.");
  return reply.status(500).send({ message: "Erro interno do servidor." });
};
