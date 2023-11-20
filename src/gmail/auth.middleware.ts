// accessToken.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Request", req);
        console.log("response", res);
        // next();
    }
}
