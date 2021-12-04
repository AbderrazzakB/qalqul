import { FastifyInstance } from "fastify";
import { CommandModel } from "./Command";

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post("/", async (request, reply) => {
    // @ts-ignore
    const { command } = request.body;
    const result = await CommandModel.create({ command });
    reply.send(result);
  });
  done();
};
