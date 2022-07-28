import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { LoggerService } from './modules/logger/logger.service';
import { SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { configSwagger } from './config/swagger.config';
import env from '@utils/constant/env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  appConfig(app);

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT, () => {
    LoggerService.log(
      `Server running port: ${env.PORT}`,
      `🚀 API server listenning on http://localhost:${env.PORT}/api`,
    );
  });
}

bootstrap();
