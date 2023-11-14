import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('book')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  greatUser(): string {
    return this.appService.greetUser();
  }
}