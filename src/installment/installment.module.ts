import { Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from "./entities/installment.entity";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Manger } from "./entities/manger.entity";
import { MangerController } from './manger/manger.controller';
import { MangerService } from './manger/manger.service';
@Module({
  imports: [TypeOrmModule.forFeature([Client]),
  TypeOrmModule.forFeature([Manger]),
  ConfigModule.forRoot(),
  JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY_TOKEN_ASSESS as any,
    signOptions: { expiresIn: `${process.env.TIME_SECRET}m` },
  }),

  ],
  controllers: [InstallmentController, MangerController],
  providers: [InstallmentService, MangerService],
})
export class InstallmentModule { }
