import { FastifyReply, FastifyRequest } from "fastify";
import { updateAddressService } from "./update-address.service";
import { addressSchema } from "../../address.dto";
import { app } from "../../../../lib/fastify";

export async function updateAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { addressId } = request.params as { addressId: string };
  const data = addressSchema.parse(request.body);
  await updateAddressService(id, addressId, data);
  app.log.info(
    `Controller: Endereço atualizado com sucesso - UserID: ${id}, AddressID: ${addressId}`
  );
  return reply.status(200).send({ message: "Endereço atualizado com sucesso" });
}
