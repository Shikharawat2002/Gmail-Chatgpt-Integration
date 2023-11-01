import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Booksc & Document

@Schema()
// this is model 
export class Booksc{
    @Prop()
    title:string;
    
    @Prop()
    author:string;

    @Prop()
    published:string;
    static title: string;

    // @Prop({default:Date.now})
    // date:Date; 
}
export const BookSchema = SchemaFactory.createForClass(Booksc)