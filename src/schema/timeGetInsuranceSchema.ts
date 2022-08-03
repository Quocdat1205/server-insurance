import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeGetInsuranceType = TimeGetInsurance & Document;

@Schema()
export class TimeGetInsurance {
  @Prop({ required: true })
  startTime: number;

  @Prop({ required: true })
  endTime: number;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const TimeGetInsuranceSchema =
  SchemaFactory.createForClass(TimeGetInsurance);
