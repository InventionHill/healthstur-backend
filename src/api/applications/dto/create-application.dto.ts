import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsOptional()
  medicalCondition?: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsNotEmpty()
  goal: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  routine: string;

  @IsString()
  @IsOptional()
  selectedProgram?: string;
}
