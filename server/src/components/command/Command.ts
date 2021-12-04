import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class Command extends TimeStamps {
  @prop()
  public description: string;
}

export const CommandModel = getModelForClass(Command);
