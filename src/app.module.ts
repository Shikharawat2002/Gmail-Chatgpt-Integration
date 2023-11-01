import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './gmail/google.strategy';
import { GmailModule } from './gmail/gmail.module';
import nodemailer from 'nodemailer'

@Module({
  imports: [GmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
