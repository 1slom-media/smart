import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SmartBillService } from './smart-bill.service';
import {
  CheckLimitDto,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from './dto/smart.dto';

@ApiTags('Order')
@Controller('smart-bill')
export class SmartBillController {
  constructor(public smartBill: SmartBillService) {}

  @ApiOperation({ summary: 'CheckLimit' })
  @Post('/check-limit')
  async checkLimit(@Body() data: CheckLimitDto) {
    return this.smartBill.checkLimit(data);
  }

  @ApiOperation({ summary: 'Create order' })
  @Post('/create-order')
  async createOrder(@Body() data: CreateOrderDto) {
    return this.smartBill.createOrder(data);
  }

  @ApiOperation({ summary: 'Update order' })
  @Put('/update-order/:id')
  async updateOrder(
    @Body() data: UpdateOrderStatusDto,
    @Param('id') id: string,
  ) {
    return this.smartBill.updateOrderStatus(id, data);
  }

  @ApiOperation({ summary: 'Get order' })
  @Put('/get-order/:id')
  async getOrder(@Param('id') id: string) {
    return this.smartBill.getOrderById(id);
  }
}
