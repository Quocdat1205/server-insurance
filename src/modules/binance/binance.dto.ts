import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderFuturesDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  side: string;

  @ApiProperty({ type: String })
  @IsString()
  symbol: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  p_stop: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  p_claim: number;
}
