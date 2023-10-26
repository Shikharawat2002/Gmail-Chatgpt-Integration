import { Module, NestModule } from "@nestjs/common";
import { UserController } from "./user.controller";
import { userService } from "./user.service";

@Module({
    imports:[],
    controllers:[UserController],
    providers:[userService]
})
export class userModule {}