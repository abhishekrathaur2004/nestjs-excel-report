process.env.TZ = 'UTC';

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Report API')
    .setDescription('API documentation for Report Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env['PORT'];
  if (!port) {
    throw new Error('PORT is not set');
  }
  await app.listen(Number(port), '0.0.0.0');
  const appUrl = await app.getUrl();
  Logger.log(`Report API is running on ${appUrl}`, 'Report API');
  Logger.log(`Swagger docs available at ${appUrl}/api`, 'Swagger');
}

bootstrap();
