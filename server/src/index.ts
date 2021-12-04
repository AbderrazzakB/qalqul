import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import commandRoute from "./components/command/command.route";
import database from "./components/database";

const server: FastifyInstance = Fastify({ logger: true });

server.register(database);
server.register(commandRoute, { prefix: "/api/command" });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async () => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen(3333);

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
