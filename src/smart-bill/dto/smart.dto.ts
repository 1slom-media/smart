import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  price: number;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  ikpu: string;

  @IsInt()
  quantity: number;
}

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  contact_type: string;
}

export class CheckLimitDto {
  @ApiProperty({ description: 'Application ID' })
  @IsString()
  backend_application_id: string;

  @ApiProperty({ description: 'client pasport' })
  @IsString()
  passport: string;

  @ApiProperty({ description: 'client phone' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'client birth_date' })
  @IsString()
  birth_date: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  passport: string;

  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @IsInt()
  installment_period: number;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  shipping_price: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

export class UpdateOrderStatusDto {
  @IsInt()
  status: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
