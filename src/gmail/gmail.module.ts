import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy'
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';

@Module({
  imports: [],
  controllers: [GmailController],
  providers: [GmailService, GoogleStrategy],
})
export class GmailModule {}