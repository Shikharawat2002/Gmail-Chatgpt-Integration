import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class AppService {

  greetUser(): string {
    return 'Hello user';
  }


  googleLogin(req)
  {
    if(!req.user)
    {
      return 'no user from google';
    }
    return {
      message: 'User information from google',
      user: req.user
    }
  }

  // addUser():{
    
  // }

  // findId( userid:string): string {
  //   console.log("Param.Id", userid)
  //   return `the id is ${userid}`
  // }
}
