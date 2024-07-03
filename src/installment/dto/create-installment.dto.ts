import { IsEmail, IsString, Length, IsNumber, IsInt, MinLength, MaxLength, Min, Max, IsNotEmpty, IsOptional, IsMobilePhone, IsEnum } from 'class-validator';

export class CreateInstallmentDto {
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


  @IsNotEmpty({ message: "address must is not empty" })
  @IsString()
  address: string;


  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)
  @IsNotEmpty({ message: "phoneNumber must is not empty" })
  @IsString({ message: "phoneNumber must is string" })
  phoneNumber: string;

  @IsString({ message: 'id_card must be an String' })
  @MinLength(14, { message: 'idCard must be at least 14' })
  @MaxLength(14, { message: 'idCard must be at most 14' })
  @IsNotEmpty({ message: "idCard must is not empty" })
  idCard: string

  @IsString({ message: "must is string" })
  @IsNotEmpty({ message: "car must is not empty" })
  @MinLength(3, { message: 'Car name must be at least 3 characters' })
  @MaxLength(15, { message: 'Car name cannot exceed 15 characters' })
  carName: string;

  @IsString({ message: "must is string" })

  @MinLength(3, { message: 'Car model must be at least 3 characters' })
  @MaxLength(15, { message: 'Car model cannot exceed 15 characters' })
  carModel: string;

  @IsNotEmpty({ message: "totalAmount must is not empty" })
  @IsNumber({}, { message: 'Total amount must be a number' })
  totalAmount: number;
  
  
  @IsNotEmpty({ message: "totalAmount must is not empty" })
  @IsNumber({}, { message: 'Total amount must be a number' })
  monthlyAmount: number;

  @IsNotEmpty({ message: "installments must is not empty" })
  @IsNumber({}, { message: 'Installments must be a number' })
  installments: number;

  @IsOptional()
  @IsInt({ message: 'Day must be an integer' })
  @Min(1, { message: 'Day must be at least 1' })
  @Max(31, { message: 'Day must be at most 31' })
  day: number;

  @IsOptional()
  @IsString({ message: 'Month must be an integer' })
  @Min(1, { message: 'Month must be at least 1' })
  @Max(12, { message: 'Month must be at most 12' })
  month: string;

  @IsOptional()
  @IsInt({ message: 'Year must be an integer' })
  year: number;


  @IsOptional()
  @IsInt({ message: 'Notification must be an integer' })
  notification: number;

  @IsOptional()
  @IsEnum(['admin', 'user'], {
    message: 'role must be one of the following values: admin, user',
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
