import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InsuranceType = Insurance & Document;

@Schema()
export class Insurance {
  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  id_sc: number;

  @Prop()
  asset: string;

  @Prop({ default: 'NAIN' })
  asset_refund: string;

  @Prop({ required: true })
  escrow: number;

  @Prop()
  amount: number;

  @Prop({ required: true })
  p_start: number;

  @Prop({ required: true })
  p_claim: number;

  @Prop({ required: true })
  expired: number; // type timestamp

  @Prop({ required: true })
  hedge: number;

  @Prop({ required: true })
  side: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  cover_payout: number;

  @Prop({ default: false })
  isClaim: boolean;

  @Prop({ default: false })
  isConfirm: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const InsuranceSchema = SchemaFactory.createForClass(Insurance);
