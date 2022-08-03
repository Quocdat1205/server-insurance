import { IsNumber, IsOptional, Matches } from 'class-validator';

export enum StateInsuranceRole {
  AVAILABLE = 'Available',
  PAYOUT_WAITING = 'PayoutWaiting',
  EXPIRED = 'Expired',
  PAID = 'Paid',
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
