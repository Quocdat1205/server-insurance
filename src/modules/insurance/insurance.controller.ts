import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  ResponseGetInsurance,
  GetInsuranceDto,
  CreateInsuranceDto,
} from './insurance.dto';
import { RealIP } from 'nestjs-real-ip';
import { LoggerService } from '@modules/logger/logger.service';
import {
  ROUTER_GET_INSURANCE,
  ROUTER_GET_INSURSNCE_REFUND,
  ROUTER_BUY_INSURANCE,
} from '@utils/router/insurance.router';

@Controller()
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post(ROUTER_BUY_INSURANCE)
  @ApiResponse({ type: ResponseGetInsurance })
  buyInsurance(@Body() body: CreateInsuranceDto) {
    LoggerService.log(`Buy insurance service`);
    return this.insuranceService.createNewInsurance(body);
  }

  @Get(ROUTER_GET_INSURANCE)
  @ApiResponse({ type: Array<ResponseGetInsurance> })
  getInsuranceByAddress(@Query() query: GetInsuranceDto, @RealIP() ip: string) {
    LoggerService.log(`Logger: get insurance controller. Ip request: ${ip}`);
    return this.insuranceService.getInsuranceByAddress(query);
  }

  @Get(ROUTER_GET_INSURSNCE_REFUND)
  getInsuranceRefundByAddress(
    @Query() query: GetInsuranceDto,
    @RealIP() ip: string,
  ) {
    LoggerService.log(`Logger: get insurance controller. Ip request: ${ip}`);
    return this.insuranceService.getInsuranceRefundByAddress(query);
  }
}
