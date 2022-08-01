import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Transformation } from 'src/pipe/transform.pipe';

export class CalCoverPayoutDto {
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  value: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_claim: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  hedge: number;
}

export class CalPStopDto {
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_claim: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  hedge: number;
}

export class CalLevel {
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Transformation.parseStringToFloat(value))
  @IsNumber()
  p_stop: number;
}
