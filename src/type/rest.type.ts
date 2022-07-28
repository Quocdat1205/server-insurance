import { IsString } from 'class-validator';

export class GetPriceTokenDto {
  @IsString()
  symbol: string;
}
