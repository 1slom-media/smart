import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { winstonLogger } from './logger/winston.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { logger: winstonLogger });
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Smart swagger api documentation')
    .setDescription('The  API description')
    .setVersion('1.0')
    .build();
  const Document = SwaggerModule.createDocument(app, options, {
    include: [],
  });
  SwaggerModule.setup('api', app, Document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
