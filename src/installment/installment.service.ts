import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { Login } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client } from "./entities/installment.entity";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { StatusCode } from "../statusCode";
import { Cron } from '@nestjs/schedule';
import { Manger } from "./entities/manger.entity";
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    
    private configService: ConfigService,
   // private accountSid = 
   // private authToken = ,
    //private 
    private jwt: JwtService,
    @InjectRepository(Manger)
    private readonly mangersRepository: Repository<Manger>,
  //  private logger :Logger
  ) { }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find()
  }

  async create(createClientDto: CreateInstallmentDto): Promise<Client> {
    const { email, password } = createClientDto
    const saltOrRounds = 10;
    const Password_hash = await bcrypt.hash(password, saltOrRounds);

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();
    let notification = day - 5
    if (notification < 1) {
      // If sd is less than 1, subtract 5 from the last day of the previous month
      const lastDayOfPreviousMonth = new Date(year, today.getMonth(), 0).getDate();
      notification = lastDayOfPreviousMonth - (5 - day);
    }
    const id_card = String(Math.floor(10000000000000 + Math.random() * 90000000000000));

    const client = this.clientsRepository.create({
      ...createClientDto,
      day,
      month,
      year,
      notification,
      password: Password_hash,
      idCard: id_card
    });
    return await this.clientsRepository.save(client);
  }

  async login(login: Login): Promise<{ client: Client, accessToken: string, refreshToken: string }> {
    const { email, password } = login
    const user_found = await this.clientsRepository.findOne({ where: { email } });
    if (!user_found) {
      throw new NotFoundException("Email and password are wrong")
    }
    const isMatch = await bcrypt.compare(password, user_found.password);
    if (!isMatch) {
      throw new NotFoundException("Email and password are wrong")
    }
    const payloadAccessToken = { id: user_found.id, role: user_found.role };
    const payloadrefreshToken = { id: user_found.id, role: user_found.role };
    const accessToken = await this.jwt.signAsync(payloadAccessToken)
    const refreshToken = await this.jwt.signAsync(payloadrefreshToken, { expiresIn: `${process.env.TIME_REFREASH}d` })
    return {
      client: user_found, accessToken, refreshToken
    }
  }

  async RefreshToken(id: number): Promise<{ access_token: string }> {
    let found_Id = await this.clientsRepository.findOne({ where: { id } }) ||
      await this.mangersRepository.findOne({ where: { id } })

    if (!found_Id) {
      throw new StatusCode("you need login", 801);
    }
    const payload = { id: found_Id.id, role: found_Id.role };
    const access_token = await this.jwt.sign(payload);
    return {
      access_token,
    };
  }

  async Search(id_card: string): Promise<Client | Client[]> {
    const user_found = await this.clientsRepository.find({ where: { idCard: id_card } });
    if (!user_found) {
      throw new NotFoundException("Email and password are wrong")
    }
    return user_found
  }

  async update(id: number, updateInstallmentDto: UpdateInstallmentDto): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    Object.assign(client, updateInstallmentDto);
    return await this.clientsRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const result = await this.clientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async GetClientByName(name: string): Promise<Client[] | Client> {

    return await this.clientsRepository.find({
      where: { name: Like(`%${name}%`) }
    });
  }



  async FindById(id: number): Promise<Client> {
    return await this.clientsRepository.findOne({ where: { id } });
  }


  /*cron*/

  @Cron("0 15 0 * * *")
  async UpdateDate() {
    const users = await this.clientsRepository.find()
    const today = new Date();
    users.forEach(async (user) => {
      user.day = today.getDate();
      user.month = today.toLocaleString('en-US', { month: 'long' });
      user.year = today.getFullYear();
      await this.clientsRepository.save(user);
    });

  }

  @Cron("0 32 0 * * *")
  async Sendnotification() {
    const users = await this.clientsRepository.find()
    const today = new Date().getDate();
   const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)
    users.forEach(user => {
      if (user.notification === today) {
      try {
          const message = client.messages.create({
            from: process.env.FROM,
            to: `whatsapp:+2${user.phoneNumber}`,
            body: `Dear customer, we would like to remind you of the installment date for the month of ${user.month}, with an installment of ${user.monthlyAmount} EGP`
          });
       //   this.logger.log(`Message sent with SID: ${message.sid}`);
        } catch (error) {
         // this.logger.error(`Failed to send message: ${error.message}`);
        }
      }
    })
    console.log("succes");
  }
}

