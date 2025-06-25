import { FastifyReply, FastifyRequest } from "fastify";
import { getAddressService } from "./get-address.service";

export async function getAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const address = await getAddressService(id);
  return reply.status(200).send(address);
}
