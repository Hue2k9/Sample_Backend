import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import configuration, {
  Configuration,
  Environment,
} from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get<Environment>('env');
  app.use(morgan('combined'));

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: environment === Environment.PRODUCTION,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(helmet());

  //Config swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  //Cors
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  const swaggerApi = configuration().swagger || 'api-docs';
  SwaggerModule.setup(swaggerApi, app, document);

  await app.listen(3000);
}
bootstrap();
