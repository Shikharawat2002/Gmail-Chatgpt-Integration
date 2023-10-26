import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./data/book.dto";
import { Booksc } from "./schemas/book.schema";

@Controller('booksc')
export class BookController {
    constructor(private bookservice: BookService) { }

    @Post('/add')
    async createBooksc(@Req() request: Request, @Body() currentBook: Book) {
        return this.bookservice.createBooksc(currentBook)
    }

    @Get('/findall')
    readBook() {
        return this.bookservice.readBook();
    }

    @Put('/update/:id')
    async updateBook(@Param('id') id: string, @Body() newBook: Book) {
        return this.bookservice.updateBook(id, newBook)
    }

    @Delete('/delete/:id')
    async deleteBook(@Param('id') id:string)
    {
        return this.bookservice.deleteBook(id);
    }


}
// export class BookController {
//     //create a constructor
//     constructor(private bookService: BookService) { }

//     @Get('/findall')
//     findallbook(): Book[] {
//         return this.bookService.findAllBook()
//     }

//     @Post('/add')
//     addBook(@Req() request:Request, @Body()book: Book): string {
//         return this.bookService.addBookService(book)
//     }

//     @Put('/update')
//     updateBook(book: Book): string {
//         return this.bookService.updateBookService(book)
//     }

//     @Delete('/delete/:id')
//     //will use Pipe Concept deleteBook(@Param("bookID",ParseIntPipe) bookID: string) if we only want is to be in int but here our id is in string
//     deleteBook( bookID: string) {
//         console.log("BookId",bookID);
//         return this.bookService.deleteBookService(bookID)
//     }
// }