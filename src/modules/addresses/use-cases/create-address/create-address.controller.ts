import { FastifyReply, FastifyRequest } from "fastify";
import { createAddressService } from "./create-address.service";
import { addressSchema } from "../../address.dto";

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
  return reply.status(201).send({
    message: "Endereço criado com sucesso",
  });
}
