import { FastifyReply, FastifyRequest } from "fastify";
import { getAddressService } from "./get-address.service";
import { app } from "../../../../lib/fastify";

export async function getAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const address = await getAddressService(id);
  app.log.info(`Controller: Endereço obtido com sucesso - UserID: ${id}`);
  return reply.status(200).send(address);
}
