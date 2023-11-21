import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GmailModule } from './gmail/gmail.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [GmailModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
}
