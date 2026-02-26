import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  rating: number;
}
