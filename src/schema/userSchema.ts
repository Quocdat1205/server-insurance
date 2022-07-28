import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserType = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  nonce: number;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
