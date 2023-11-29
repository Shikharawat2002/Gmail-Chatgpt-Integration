import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class simpleFunc implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req;
    // console.log('Request...', user.body);
    next;
    
  }
}