import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class AppService {

  getHello() {
    console.log("@@@@");
  }

}
