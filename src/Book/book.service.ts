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

    //create book
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
