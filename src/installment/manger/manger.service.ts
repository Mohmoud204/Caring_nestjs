import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StatusCode } from "../../statusCode";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Manger } from "../entities/manger.entity";
import * as bcrypt from 'bcryptjs';
import { CreateMangerDto } from "../dto/create-manger.dto";
import { Login } from "../dto/create-manger.dto";
import { UpdateMangerDto } from "../dto/update.manger.dto";
@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger)
    private readonly mangersRepository: Repository<Manger>,
    private jwt: JwtService
  ) { }
  async findAll(): Promise<Manger[]> {
    return await this.mangersRepository.find()
  }
  async create(createMangerDto: CreateMangerDto): Promise<Manger> {
    const { email, password } = createMangerDto
    if (await this.mangersRepository.findOne({ where: { email } })) {
      throw new BadRequestException("The email already exists")
    }
    const saltOrRounds = 10;
    const Password_hash = await bcrypt.hash(password, saltOrRounds);
    const manger = this.mangersRepository.create({
      ...createMangerDto,
      password: Password_hash
    });
    return await this.mangersRepository.save(manger);
  }
  async login(login: Login): Promise<{ Administrator: Manger, accessToken: string, refreshToken: string }> {
    const { email, password } = login
    const user_found = await this.mangersRepository.findOne({ where: { email } });
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
      Administrator: user_found, accessToken, refreshToken
    }
  }
  
  async update(id: number, updateMangerDtoDto: UpdateMangerDto): Promise<Manger> {
    const client = await this.mangersRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    Object.assign(client, updateMangerDtoDto);
    return await this.mangersRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const result = await this.mangersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
  
  async FindById(id: number): Promise<Manger> {
    return await this.mangersRepository.findOne({ where: { id } });
  }
  
}