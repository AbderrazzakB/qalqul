import { ConversationModel } from "./Conversation";

export default (fastify, opts, done) => {
  fastify.post("/", async (request, reply) => {
    const { text, origin } = request.body;
    const commandId = text.match(/\w{24}/)[0];
    if (commandId) {
      let conversation = await ConversationModel.findOne({ commandId });
      if (!conversation) {
        conversation = new ConversationModel({ commandId });
      }
      await conversation.populate("commandId");
      conversation.dialog.push({
        text,
        origin,
        type: "in",
      });
      await conversation.save();
      reply.send({
        text: "ok",
        perviousConversation: conversation.dialog,
        command: conversation.commandId,
      });
    } else {
      reply.send({
        error: "please mention you command id",
      });
    }
  });
  done();
};
