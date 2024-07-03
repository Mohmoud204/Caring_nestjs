import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabseModule } from './databse/databse.module';
import { ConfigModule } from '@nestjs/config';
import { InstallmentModule } from './installment/installment.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [DatabseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), InstallmentModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
