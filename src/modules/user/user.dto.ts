import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({ type: String })
  @IsString()
  walletAddress: string;
}

export class AuthDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  signature: string;
}

export class ResponseGetNonce {
  @ApiProperty({ type: String })
  @IsString()
  walletAddress: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  nonce: number;

  @ApiProperty({ type: Date })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  updatedAt?: Date;
}
