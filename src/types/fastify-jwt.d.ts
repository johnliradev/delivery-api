import fastifyJwt from "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      role: "ADMIN" | "RESTAURANT" | "CUSTOMER";
    };
    user: {
      sub: string;
      role: "ADMIN" | "RESTAURANT" | "CUSTOMER";
    };
  }
}
