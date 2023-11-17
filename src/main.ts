import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // or '*'
  //   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });
  // app.use(globalMiddleware1);
  // app.use(globalMiddleware2);

  app.useStaticAssets(join(__dirname, '..', 'test'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap()
