import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CalCoverPayoutDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  value: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_claim: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  hedge: number;
}

export class CalPStopDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_claim: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  hedge: number;
}

export class CalLevel {
  @ApiProperty({ type: Number })
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_stop: number;
}
