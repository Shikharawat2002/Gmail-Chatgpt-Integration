import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./data/book.dto";

@Controller('book')
export class BookController {
    //create a constructor
    constructor(private bookService: BookService) { }

    @Get('/findall')
    findallbook(): Book[] {
        return this.bookService.findAllBook()
    }

    @Post('/add')
    addBook(Req book: Book): string {
        return this.bookService.addBookService(book)
    }

    @Put('/update')
    updateBook(book: Book): string {
        return this.bookService.updateBookService(book)
    }

    @Delete('/delete/:id')
    deleteBook(bookID: string) {
        return this.bookService.deleteBookService(bookID)
    }

}