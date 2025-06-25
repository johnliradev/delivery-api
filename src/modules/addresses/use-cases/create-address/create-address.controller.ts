import { FastifyReply, FastifyRequest } from "fastify";
import { createAddressService } from "./create-address.service";
import { addressSchema } from "../../address.dto";
import { app } from "../../../../lib/fastify";

export async function createAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { street, number, city, zipCode } = addressSchema.parse(request.body);

  await createAddressService(id, {
    street,
    number,
    city,
    zipCode,
  });
  app.log.info(`Controller: Endereço criado com sucesso - UserID: ${id}`);
  return reply.status(201).send({
    message: "Endereço criado com sucesso",
  });
}
