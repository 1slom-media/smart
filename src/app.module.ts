import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiClientModule } from './api-client/api-client.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'main',
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT ?? '5432'),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [AuthEntity],
      synchronize: true,
    }),
    AuthModule,
    ApiClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
