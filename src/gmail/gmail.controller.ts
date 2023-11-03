
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';
import { GoogleStrategy } from './google.strategy';
import { GmailInboxService } from './gmailInbox.service';

@Controller('google')
export class GmailController {
  constructor(private readonly gmailService: GmailService,
    private readonly gmailInboxService: GmailInboxService,
    private readonly googleStrategy: GoogleStrategy) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.gmailService.googleLogin(req)
  }
 
  @Get('gmail/inbox/')
  getInbox()
  {
    return this.gmailInboxService.getInbox();
  }
  @Get('gmail/Inbox/readmessage/:messageId')
  getReadMessage(@Param('messageId') messageId: string)
  {
    return this.gmailInboxService.getReadMessage(messageId)
  }

d

 
}