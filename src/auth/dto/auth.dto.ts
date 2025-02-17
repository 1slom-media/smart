import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@allgood.uz' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'test@allgood.uz' })
  @IsString()
  password: string;
}
