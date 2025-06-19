import { FastifyReply, FastifyRequest } from "fastify";
import { getProfileService } from "./get-profile.service";

export const getProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.sub;
  const userProfile = await getProfileService(userId);
  return reply.code(200).send({
    user: userProfile,
  });
};
