import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Nami Insurance')
  .setDescription('Nami insurance BE v1')
  .setVersion('1.0')
  .addTag('insurance')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();
