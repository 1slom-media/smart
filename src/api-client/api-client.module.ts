import { forwardRef, Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [ApiClientService],
  exports: [ApiClientService],
})
export class ApiClientModule {}
