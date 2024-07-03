import { IsEmail, IsString, Length, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateMangerDto {
  @IsString()
  @IsNotEmpty({ message: "name must is not empty" })
  @Length(3, 15, { message: 'Name must be between 3 and 15 characters' })
  name: string;


  @IsNotEmpty({ message: "email must is not empty" })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;


  @IsNotEmpty({ message: "password must is not empty" })
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;


  @IsEnum(['manger', 'admin'], {
    message: 'role must be one of the following values: manger,admin ',
  })
  role: string;

}


export class Login {
  @IsNotEmpty({ message: "email must is not empty" })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;


  @IsNotEmpty({ message: "password must is not empty" })
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
}
