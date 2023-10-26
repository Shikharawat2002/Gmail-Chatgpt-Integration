import { Injectable, Param } from "@nestjs/common";
import { Book } from "./data/book.dto";
import { Booksc, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose'
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Booksc') private readonly BookModel: Model<BookDocument>,
    ) { }

    //create user 
    async createBooksc(currentBook: Booksc): Promise<Booksc> {
        const newBook = new this.BookModel(currentBook)
        return newBook.save()
    }

    //get book
    async readBook() {
        return this.BookModel.find().exec() // Use exec() separately
            .then(books => books)
            .catch(err => {
                console.log("ERR", err);
                throw err; // You might want to throw the error so it can be handled at a higher level
            });
    }

    async updateBook(id: string, book: Book) {
        return this.BookModel.findOneAndUpdate({ _id: id }, book, { new: true }).exec()
    }

    async deleteBook(id:string)
    {
        return this.BookModel.findByIdAndRemove({_id:id},{new:true}).exec()
    }
}
// export class BookService {
//     // create a empty array of Book type
//     public book: Book[] = [];

//     //add service
//     addBookService(newBook: Book): string {
//         //add uuid to generate random unique id
//         // console.log("newBook",newBook)
//         newBook.id = uuidv1()
//         this.book.push(newBook);
//         // console.log("book", this.book)
//         return `newbook added successfully`

//     }
//     // update service
//     updateBookService(newBook: Book): string {
//         //first we need a index at which we have to update the value use findIndex
//         let index = this.book.findIndex((currentBook) => {
//             return currentBook.id === newBook.id
//         }
//         )
//         this.book[index] = newBook;
//         return `updated successfully`
//     }

//     // delete service
//     deleteBookService(@Param("id") id: string): string {
//         this.book = this.book.filter((currentBook) =>

//             currentBook.id !== id
//         )
//         return `Deleted successfully`
//     }
//     // find all service
//     findAllBook(): Book[] {
//         return this.book
//     }

// }