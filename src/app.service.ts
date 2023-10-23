import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class AppService {

  greetUser(): string {
    return 'Hello user';
  }

  findId(@Param() userid:string): string {
    console.log("Param.Id", userid)
    return `the id is ${userid}`
  }
}
