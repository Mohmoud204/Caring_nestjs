import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusCode extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
