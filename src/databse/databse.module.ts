import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.localhost,
      port: 3306,
      username: process.env.user,
      password: process.env.password,
      database: process.env.db,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],

})
export class DatabseModule { }
