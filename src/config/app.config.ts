import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from '@modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import appSession from './session.config';
import { origin } from '@utils/constant/origin';

export async function appConfig(
  app: NestExpressApplication,
): Promise<NestExpressApplication> {
  app.setGlobalPrefix('api/insurance');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  );
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.enableCors({
    origin,
    credentials: true,
  });
  app.use(appSession);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
}
