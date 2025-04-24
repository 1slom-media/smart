import { Module } from '@nestjs/common';
import { SmartBillService } from './smart-bill.service';
import { SmartBillController } from './smart-bill.controller';
import { ApiClientModule } from 'src/api-client/api-client.module';

@Module({
  imports:[ApiClientModule],
  providers: [SmartBillService],
  controllers: [SmartBillController]
})
export class SmartBillModule {}
