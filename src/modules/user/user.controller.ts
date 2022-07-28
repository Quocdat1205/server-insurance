import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoggerService } from '@modules/logger/logger.service';
import {
  ROUTER_GET_NONCE,
  ROUTER_LOGIN_METAMASK,
} from '@utils/router/insurance.router';
import { JwtDto, AuthDto, ResponseGetNonce } from './user.dto';
import { AuthService } from '@modules/auth/auth.service';

@Controller()
export class UserController {
  constructor(private readonly autherService: AuthService) {}

  @Get(ROUTER_GET_NONCE)
  @ApiResponse({ type: ResponseGetNonce })
  public async getNonce(@Query() query: JwtDto) {
    LoggerService.log(`Get nonce`);
    return this.autherService.getNonce(query);
  }

  @Post(ROUTER_LOGIN_METAMASK)
  @ApiBody({ type: AuthDto })
  public async logIn(@Body() body: AuthDto) {
    LoggerService.log(`Login metamask`);
    return this.autherService.loginWithCredentials(body);
  }
}
