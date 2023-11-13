import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export class BookMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        next();
    }
}
