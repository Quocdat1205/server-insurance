import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({
    type: String,
    description: 'Etherium address',
    example: '0xFA39a930C7A3D1fEde4E1348FF74c0c5ba93D2B4',
  })
  @IsString()
  walletAddress: string;
}

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'Etherium address',
    example: '0xFA39a930C7A3D1fEde4E1348FF74c0c5ba93D2B4',
  })
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class ResponseGetNonce {
  @ApiProperty({
    type: String,
    description: 'Etherium address',
    example: '0xFA39a930C7A3D1fEde4E1348FF74c0c5ba93D2B4',
  })
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
