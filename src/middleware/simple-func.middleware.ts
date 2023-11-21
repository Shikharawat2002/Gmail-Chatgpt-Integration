import { Request, Response, NextFunction } from 'express'

export function simpleFunc(req: Request, res: Response, next: NextFunction) {
  // In here do some stuff :p
  console.log('Executing request after the function middleware...');
  next;
} 