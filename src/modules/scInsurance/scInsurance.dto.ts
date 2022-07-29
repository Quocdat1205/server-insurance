import { IsNumber, IsOptional, Matches } from 'class-validator';

export enum StateInsuranceRole {
  AVAILABLE = 'AVAILABLE',
  PAYOUT_WAITING = 'PAYOUT_WAITING',
  EXPIRED = 'EXPIRED',
}

export class UpdateInsuranceDto {
  @IsNumber()
  idInsurance: number;

  @IsOptional()
  @Matches(
    `^${Object.values(StateInsuranceRole)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  state: StateInsuranceRole;
}
