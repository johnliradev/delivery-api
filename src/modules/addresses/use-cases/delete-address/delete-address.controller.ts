import { FastifyReply, FastifyRequest } from "fastify";
import { deleteAddressService } from "./delete-address.service";

export async function deleteAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { addressId } = request.params as { addressId: string };
  await deleteAddressService(id, addressId);
  return reply.status(200).send({ message: "Endereço deletado com sucesso" });
}
