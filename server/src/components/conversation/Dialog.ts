import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export default class Dialog extends TimeStamps {
  @prop({ required: true })
  text!: string;

  @prop({ enum: ["in", "out"], required: true })
  type!: "in" | "out";

  @prop()
  origin?: string;
}
