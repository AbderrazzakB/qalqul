import { setGlobalOptions } from "@typegoose/typegoose";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

setGlobalOptions({
  globalOptions: {
    useNewEnum: true,
  },
});

const dbConnection: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "qalqul",
    });
    fastify.log.info("Mongoose connected to MongoDB");
    mongoose.set("debug", process.env.NODE_DEV === "development");
    fastify.decorate("mongoose", mongoose);
  } catch (error) {
    fastify.log.error(error);
  }
};

export default fp(dbConnection);
