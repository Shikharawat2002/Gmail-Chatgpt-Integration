import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//  
// }

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get()
  greatUser(): string {
    return this.appService.greetUser();
  }

  @Get(':userid')
  findId(@Param('userid') userid: string): string {
    return this.appService.findId(userid);
  }
}

