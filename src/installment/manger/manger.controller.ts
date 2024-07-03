import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Request, Put, Query } from '@nestjs/common';
import { MangerService } from "../manger/manger.service"
import { Manger } from "../entities/manger.entity";
import { MangerAuthGuard } from "../guard/client.guard"
import { ValidationPipe } from "../../validation.pipe";
import { CreateMangerDto } from "..//dto/create-manger.dto";
import { UpdateMangerDto } from "../dto/update.manger.dto";
import { Login } from "../dto/create-manger.dto";
@Controller('moderators')
export class MangerController {
  constructor(private readonly mangerService: MangerService) { }
  @Get("/getAll")
  @UseGuards(MangerAuthGuard)
  async findAll(): Promise<Manger[]> {
    return await this.mangerService.findAll()
  }
  @Post("create")
  @UsePipes(new ValidationPipe())
  async create(@Body() createMangerDto: CreateMangerDto): Promise<Manger> {
    return await this.mangerService.create(createMangerDto);
  }
  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(@Body() login: Login): Promise<{ Administrator: Manger, accessToken: string, refreshToken: string }> {
    return await this.mangerService.login(login);
  }

  @Get("findOne/:id")
  @UseGuards(MangerAuthGuard)
  async FindById(@Param("id") id: number): Promise<Manger> {
    return await this.mangerService.FindById(id)
  }

  @Put('/:id')
  @UseGuards(MangerAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateMangerDto: UpdateMangerDto): Promise<Manger> {
    return this.mangerService.update(id, updateMangerDto);
  }

  @UseGuards(MangerAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.mangerService.delete(id);
    return { message: `User with ID ${id} has been deleted` };
  }
}