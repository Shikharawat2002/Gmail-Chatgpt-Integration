import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
dotenv.config();

// function globalMiddleware1(req: Request, res: Response, next: NextFunction) {
//     // console.log("Global Middleware1....");
//     next();
// }

// function globalMiddleware2(req: Request, res: Response, next: NextFunction) {
//     // console.log("Second middleware.....");
//     next();
// }
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // app.use(globalMiddleware1);
    // app.use(globalMiddleware2);
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(3000);
}

bootstrap()