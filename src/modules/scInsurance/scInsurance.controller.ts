import { Controller, Get } from '@nestjs/common';
import { ScInsuranceService } from './scInsurance.service';
import { InjectModel } from '@nestjs/mongoose';
import { Insurance, InsuranceType } from '@schema';
import { Model } from 'mongoose';
import { StateInsuranceRole } from './scInsurance.dto';

@Controller('sc')
export class ScInsuranceController {
  constructor(
    private scInsuranceService: ScInsuranceService,
    @InjectModel(Insurance.name)
    private readonly modelInsurance: Model<InsuranceType>,
  ) {}

  @Get('update-insurance')
  public async updateInsurance() {
    return this.scInsuranceService.updateStateSmartContract({
      idInsurance: 1,
      state: StateInsuranceRole.EXPIRED,
    });
  }

  @Get('reset-db')
  public async resetDb() {
    return await this.modelInsurance.deleteMany({});
  }

  @Get('test-transfer')
  public testTransfer() {
    return this.scInsuranceService.refundNAIN(
      '0xc5F6EcaDb23545500300Ed265602736B8C0908e5',
      0.1,
    );
  }
}
