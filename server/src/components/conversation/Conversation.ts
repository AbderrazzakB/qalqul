import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import Command from "../command/Command";
import Dialog from "./Dialog";

export default class Conversation extends TimeStamps {
  @prop({ type: mongoose.Schema.Types.ObjectId, ref: Command })
  public commandId: string;

  @prop({ type: () => Dialog })
  public dialog: mongoose.Types.Array<Dialog>;
}

export const ConversationModel = getModelForClass(Conversation);
