
import { Body, Controller, Get, Param, Post, Render, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';
import { GoogleStrategy } from './google.strategy';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';
import { AxiosResponse } from 'axios';

@Controller('google')
export class GmailController {
  constructor(private readonly gmailService: GmailService,
    private readonly gmailInboxService: GmailInboxService,
    private readonly gmailSendService: GmailSendService,
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

  @Get('test')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  @Get('gmail/inbox/')
  getInbox() {
    return this.gmailInboxService.getInbox();
  }


  @Get('gmail/Inbox/readmessage/:messageId')
  getReadMessage(@Param('messageId') messageId: string) {
    return this.gmailInboxService.getReadMessage(messageId)
  }

  @Post('generate-response')
  async generateEmailResponse(@Body() data: { prompt: string }) {
    const response = await this.gmailSendService.generateEmailResponse(data.prompt);
    return { response };
  }

  @Post('send-email')
  async sendEmail(@Body() emailContent: any): Promise<AxiosResponse<any>> {
    return this.gmailSendService.sendMail(emailContent);
  }


  // @Post('send-email')
  // async sendEmail(
  //   // @Body() data: { recipient: string; subject: string; body: string; accessToken: string },
  // ) {
  //   const response = await this.gmailSendService.sendMail(
  //     // data.recipient,
  //     // data.subject,
  //     // data.body,
  //     // data.accessToken,
  //   );
  //   return { response };
  // }

}

function root() {
  throw new Error('Function not implemented.');
}
