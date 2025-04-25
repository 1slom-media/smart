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
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'image' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'price' })
  @IsInt()
  price: number;

  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'ikpu' })
  @IsString()
  @IsNotEmpty()
  ikpu: string;

  @ApiProperty({ description: 'quantity' })
  @IsInt()
  quantity: number;
}

export class ContactDto {
  @ApiProperty({ description: 'phone' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'full_name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'contact_type' })
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
  @ApiProperty({ description: 'passport' })
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty({ description: 'birth_date' })
  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @ApiProperty({ description: 'period' })
  @IsInt()
  installment_period: number;

  @ApiProperty({ description: 'phone' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'shipping price' })
  @IsString()
  @IsNotEmpty()
  shipping_price: string;

  @ApiProperty({ description: 'contacts',isArray:true, type: () => ContactDto})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts: ContactDto[];

  @ApiProperty({ description: 'items', isArray: true, type: () => ItemDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'status for number' })
  @IsInt()
  status: number;

  @ApiProperty({ description: 'comment' })
  @IsOptional()
  @IsString()
  comment?: string;
}
