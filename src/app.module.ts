import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './Book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GmailModule } from './gmail/gmail.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://shikha123:shikha123@cluster0.vcwwbu6.mongodb.net/?retryWrites=true&w=majority'),
    GmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('App module')
  }
}
