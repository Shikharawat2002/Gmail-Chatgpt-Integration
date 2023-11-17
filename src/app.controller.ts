import { Controller, Get, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // greatUser(): string {
  //   return this.appService.greetUser();
  // }

  /* The `@Get()` decorator is used to define a route handler for HTTP GET requests. In this case, it
  is defining a route handler for the root URL ("/"). */
  // @Get()
  // @Render('index')
  // root() {
  //   return { message: 'Hello world!' };
  // }
  @Get()
  root(@Res() res: Response) {
    return res.render(
      this.appService.getViewName(),
      { message: 'hello world!' }
    );
  }



}