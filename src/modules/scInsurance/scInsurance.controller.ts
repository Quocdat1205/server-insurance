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
      idInsurance: 50,
      state: StateInsuranceRole.EXPIRED,
    });
  }

  @Get('reset-db')
  public async resetDb() {
    return await this.modelInsurance.deleteMany({});
  }
}
