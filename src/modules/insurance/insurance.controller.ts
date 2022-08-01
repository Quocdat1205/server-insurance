import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  ResponseGetInsurance,
  GetInsuranceDto,
  CreateInsuranceDto,
} from './insurance.dto';
import { RealIP } from 'nestjs-real-ip';
import { LoggerService } from '@modules/logger/logger.service';
import { GetInsuranceByIdDto } from './insurance.dto';
import {
  ROUTER_GET_INSURANCE,
  ROUTER_GET_INSURSNCE_REFUND,
  ROUTER_BUY_INSURANCE,
  ROUTER_GET_COVER_PAYOUT,
  ROUTER_GET_INSURANCE_BY_ID,
} from '@utils/router/insurance.router';
import { CalCoverPayoutDto } from 'src/type/handler.type';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';

@Controller()
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @UseGuards(JwtAuthGuard)
  @Post(ROUTER_BUY_INSURANCE)
  @ApiResponse({ type: ResponseGetInsurance })
  buyInsurance(@Body() body: CreateInsuranceDto) {
    LoggerService.log(`Buy insurance service`);
    return this.insuranceService.createNewInsurance(body);
  }

  @Get(ROUTER_GET_INSURANCE)
  @ApiResponse({ type: Array<ResponseGetInsurance> })
  getInsuranceByAddress(@Query() query: GetInsuranceDto, @RealIP() ip: string) {
    LoggerService.log(
      `Logger: get insurance by address controller. Ip request: ${ip}`,
    );
    return this.insuranceService.getInsuranceByAddress(query);
  }

  @Get(ROUTER_GET_INSURSNCE_REFUND)
  @ApiResponse({ type: Array<ResponseGetInsurance> })
  getInsuranceRefundByAddress(
    @Query() query: GetInsuranceDto,
    @RealIP() ip: string,
  ) {
    LoggerService.log(
      `Logger: get insurance refund controller. Ip request: ${ip}`,
    );
    return this.insuranceService.getInsuranceRefundByAddress(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ResponseGetInsurance })
  @Get(ROUTER_GET_INSURANCE_BY_ID)
  getInsuranceById(@Query() query: GetInsuranceByIdDto) {
    LoggerService.log(`Logger: get insurance by id`);
    return this.insuranceService.getInsuranceById(query);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Number })
  @Get(ROUTER_GET_COVER_PAYOUT)
  getCoverPayout(@Query() query: CalCoverPayoutDto) {
    console.log(query);

    LoggerService.log(`Logger: get cover payout`);
    return this.insuranceService.getCoverPayout(query);
  }
}
