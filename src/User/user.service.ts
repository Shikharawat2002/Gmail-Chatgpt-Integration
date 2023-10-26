import { Injectable } from "@nestjs/common";

@Injectable()
export class userService{
    
    getHello()
    {
        return console.log("Hello")
    }
}