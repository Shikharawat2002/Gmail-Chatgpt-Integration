import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();


function globalMiddleware1(req: Request, res: Response, next: NextFunction) {
  // console.log("Global Middleware1....");
  next();
}

function globalMiddleware2(req: Request, res: Response, next: NextFunction) {
  // console.log("Second middleware.....");
  next();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with the URL of your Next.js app
  });
  app.use(globalMiddleware1);
  app.use(globalMiddleware2);
  await app.listen(3000);
}
bootstrap()
