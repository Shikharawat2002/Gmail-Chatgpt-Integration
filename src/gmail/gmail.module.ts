import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy'
import { GmailController } from './gmail.controller';
// import { GmailService } from './gmail.service';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';


@Module({
  imports: [],
  controllers: [GmailController],
  providers: [GoogleStrategy, GmailInboxService, GmailSendService],
})

export class GmailModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'gmail', method: RequestMethod.ALL });
  }
}