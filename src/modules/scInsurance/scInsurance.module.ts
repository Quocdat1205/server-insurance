import { Module } from '@nestjs/common';
import { ScInsuranceService } from './scInsurance.service';
import { ScInsuranceController } from './scInsurance.controller';
import { EthersCoreModule } from '@modules/contract/etherium/ethers-core.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Insurance,
  InsuranceSchema,
  TimeGetInsurance,
  TimeGetInsuranceSchema,
} from '@schema';
import { BscService } from '@modules/contract/bsc/bsc.service';

@Module({
  imports: [
    EthersCoreModule.forRoot({}),
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
      { name: TimeGetInsurance.name, schema: TimeGetInsuranceSchema },
    ]),
  ],
  exports: [],
  providers: [ScInsuranceService, BscService],
  controllers: [ScInsuranceController],
})
export class ScInsuranceModule {}
