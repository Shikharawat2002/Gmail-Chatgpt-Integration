import { Controller, Get } from "@nestjs/common";
import { userService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userservice: userService ){}
    
   @Get()
   gethello()
   {
    return this.userservice.getHello();
   }
}