import { Injectable } from "@nestjs/common";
import { Book } from "./data/book.dto";
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class BookService {
    // create a empty array of Book type 
    public book: Book[] = [];

    //add service
    addBookService(newBook: Book): string {
        //add uuid to generate random unique id
        console.log("newBook",newBook)
        newBook.id = uuidv1()
        this.book.push(newBook);
        console.log("book", this.book)
        return `newbook added successfully`

    }
    // update service 
    updateBookService(newBook: Book): string {
        //first we need a index at which we have to update the value use findIndex
        let index = this.book.findIndex((currentBook) => {
            return currentBook.id === newBook.id
        }
        )
        this.book[index] = newBook;
        return `updated successfully`
    }

    // delete service 
    deleteBookService(bookId: string): string {
        this.book = this.book.filter((currentBook) =>

            currentBook.id !== bookId
        )
        return `Deleted successfully`
    }
    // find all service 
    findAllBook(): Book[] {
        return this.book
    }

}