import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { consumers } from "stream";
import { BookMiddleware } from "./book.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { BookSchema } from "./schemas/book.schema";

@Module({
    imports:[
        // method to configure the module, including defining which models should be registered in the current scope.
        MongooseModule.forFeature([{name:'Booksc', schema:BookSchema}])
    ],
    controllers:[BookController],
    providers:[BookService],

})
export class BookModule implements NestModule{
 configure(_consumer:MiddlewareConsumer)
 {
    // _consumer.apply(BookMiddleware).forRoutes('book');
 }
}