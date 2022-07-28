import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class UnAuthorizedException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
  }
}
