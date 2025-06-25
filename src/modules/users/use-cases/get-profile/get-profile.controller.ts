import { FastifyReply, FastifyRequest } from "fastify";
import { getProfileService } from "./get-profile.service";
import { getAddressService } from "../../../addresses/use-cases/get-address/get-address.service";

export const getProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;
  const userProfile = await getProfileService(userId);
  const address = await getAddressService(userId);
  return reply.code(200).send({
    user: { ...userProfile, address: address },
  });
};
