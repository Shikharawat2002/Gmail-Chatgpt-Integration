import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User
{
 @Prop()
 userName:"string"
 
 @Prop()
 password:"string"

 @Prop()
 Data:"string"
}

export const UserSchema = SchemaFactory.createForClass(User)