import { ApiProperty } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateInsuranceDto {
  @ApiProperty({
    required: true,
    description: 'Ethereum account address',
    example: '0x264D6BF791f6Be6F001A95e895AE0a904732d473',
    minLength: 42,
    maxLength: 42,
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  owner: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  hash: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  id_sc: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  asset: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  asset_refund: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  escrow: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_start: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  p_claim: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  expired: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  hedge: number;
}

export class GetInsuranceDto {
  @ApiProperty({
    required: true,
    description: 'Ethereum account address',
    example: '0x264D6BF791f6Be6F001A95e895AE0a904732d473',
    minLength: 42,
    maxLength: 42,
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  owner: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  min: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  max: number;

  @ApiProperty({ type: Boolean })
  @IsNumber()
  @IsNotEmpty()
  isAll: boolean;
}

export class GetInsuranceByIdDto {
  @ApiProperty({ type: String })
  @IsString()
  _id: string;
}

export class ResponseGetInsurance {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  owner: string;

  @ApiProperty({ type: String })
  hash: string;

  @ApiProperty({ type: String })
  asset: string;

  @ApiProperty({ type: String })
  asset_refund: string;

  @ApiProperty({ type: Number })
  escrow: number;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: Number })
  p_start: number;

  @ApiProperty({ type: Number })
  p_claim: number;

  @ApiProperty({ type: Number })
  expired: number;

  @ApiProperty({ type: Number })
  hedge: number;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Number })
  cover_payout: number;

  @ApiProperty({ type: Boolean })
  isClaim: boolean;

  @ApiProperty({ type: Boolean })
  isConfirm: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
