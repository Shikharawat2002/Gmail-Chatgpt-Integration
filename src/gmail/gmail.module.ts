import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy'
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';

@Module({
  imports: [],
  controllers: [GmailController],
  providers: [GmailService, GoogleStrategy, GmailInboxService, GmailSendService],
})
export class GmailModule { }