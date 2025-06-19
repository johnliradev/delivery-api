import fastifyJwt from "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      role: "ADMIN" | "MEMBER" | "CUSTOMER";
    };

    user: {
      sub: string;
      role: "ADMIN" | "MEMBER" | "CUSTOMER";
    };
  }
}
