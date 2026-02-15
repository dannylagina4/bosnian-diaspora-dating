import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterEmailDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class LoginEmailDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class PhoneOtpRequestDto {
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  otp?: string;
}
