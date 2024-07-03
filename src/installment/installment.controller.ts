import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Request, Put, Query } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { Login } from './dto/create-installment.dto';
import { Client } from "./entities/installment.entity";
import { ValidationPipe } from "../validation.pipe";
import { AdminAuthGuard } from "./guard/admin.guard"
import { RefreshAuthGuard } from "./guard/refresh.guard"
@Controller('installment')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) { }

  @Post("create")
  @UsePipes(new ValidationPipe())
  async create(@Body() createInstallmentDto: CreateInstallmentDto): Promise<Client> {
    return await this.installmentService.create(createInstallmentDto);
  }
  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(@Body() login: Login): Promise<{ client: Client, accessToken: string, refreshToken: string }> {
    return await this.installmentService.login(login);
  }

  @Get("findAll")
  @UseGuards(AdminAuthGuard)
  async findAll(): Promise<Client[]> {
    return await this.installmentService.findAll()
  }

  @Post("refresh")
  @UseGuards(RefreshAuthGuard)
  async RefreshToken(@Request() req):Promise<{ access_token: string }> {
    return await this.installmentService.RefreshToken(req.refresh.id)
  }

  @Get("search/:id")
  @UseGuards(AdminAuthGuard)
  async Search(@Param("id") id:string):Promise<Client | Client[]> {
    return await this.installmentService.Search(id)
  }
  
  @Get("findOne/:id")
  @UseGuards(AdminAuthGuard)
  async FindById(@Param("id") id:number):Promise<Client> {
    return await this.installmentService.FindById(id)
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateInstallmentDto: UpdateInstallmentDto): Promise<Client> {
    return this.installmentService.update(id, updateInstallmentDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.installmentService.delete(id);
    return { message: `User with ID ${id} has been deleted` };
  }


  @UseGuards(AdminAuthGuard)
  @Get('name/:name')
  async GetClientByName(@Param("name") name:string) {
   return await this.installmentService.GetClientByName(name);
  }
  
  
  
  /* cron */
 
  
}
