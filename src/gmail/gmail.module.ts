import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy'
import { GmailController } from './gmail.controller';
// import { GmailService } from './gmail.service';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';
import { SimpleLoggerMiddleware } from 'src/middleware/simple-logger.middleware';
import { simpleFunc } from 'src/middleware';


@Module({
  imports: [],
  controllers: [GmailController],
  providers: [GoogleStrategy, GmailInboxService, GmailSendService],
})

export class GmailModule {

}
// export class GmailModule implements NestModule
// {
//   configure(consumer: MiddlewareConsumer) {
//       consumer.apply(simpleFunc).forRoutes('google');
//   }
//  }