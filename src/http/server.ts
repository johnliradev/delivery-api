import { app } from "../lib/fastify";
import { env } from "../config/env";
const PORT = env.PORT || 3333;
app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
