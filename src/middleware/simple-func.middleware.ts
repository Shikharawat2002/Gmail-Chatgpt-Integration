import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class simpleFunc implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = req?.query;
    console.log('Request...', req?.query);
    console.log("Req.user", req?.user)
    next();
  }
}