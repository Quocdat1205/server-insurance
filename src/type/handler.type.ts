import { IsNumber } from 'class-validator';

export class CalCoverPayoutDto {
  @IsNumber()
  value: number;

  @IsNumber()
  p_start: number;

  @IsNumber()
  p_claim: number;

  @IsNumber()
  hedge: number;
}

export class CalPStopDto {
  @IsNumber()
  p_start: number;

  @IsNumber()
  p_claim: number;

  @IsNumber()
  hedge: number;
}

export class CalLevel {
  @IsNumber()
  p_start: number;

  @IsNumber()
  p_stop: number;
}
