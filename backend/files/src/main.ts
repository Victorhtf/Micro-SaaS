import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { error } from 'console';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;

  await app
    .listen(port)
    .then(() =>
      console.log(`\nApplication is running on: http://localhost:${port}\n`),
    )
    .catch(error);
}

bootstrap();
