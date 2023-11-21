
import { Body, Controller, Get, Param, Post, Query, Render, Req, Res, UseGuards, NestMiddleware } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';
import { AxiosResponse } from 'axios';
import { GoogleStrategy } from './google.strategy';

@Controller('google')
export class GmailController {
  constructor(
    private readonly gmailInboxService: GmailInboxService,
    private readonly gmailSendService: GmailSendService,
    private readonly googleStrategy: GoogleStrategy
  ) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Res() res) {
  }



  @Get('redirect')
  @Render('index.hbs')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    //user Info
    const user = {
      accessToken: req?.user?.accessToken,
      email: req?.user?.email
    }
    req.userdetails = user;

    // fetch all mails 
    const mails = await this.gmailInboxService.getMailList(user.email, user.accessToken);
    const myMail = [];
    mails.forEach((element) => {
      const dateHeader = element?.payload?.headers?.find((header) => header.name === 'Date');
      const sender = element?.payload?.headers?.find((header) => header.name === "From")
      myMail.push({
        partialName: 'index.hbs',
        message: {
          snippet: element?.snippet,
          headers: dateHeader ? dateHeader.value : null,
          from: sender ? sender.value : null,
        },
      });
    }
    );
    // console.log(myMail)
    return { message: myMail };
  }


  @Get('mail')
  getmailList(@Query('inboxid') inboxId: string, @Query('accessToken') accessToken: string,) {
    return this.gmailInboxService.getMailList(inboxId, accessToken);

  }

  @Get('/test')
  @Render('index.hbs')
  root() {
    return { message: 'hello' };
  }


  @Get('gmail/inbox')
  getInbox(@Query('inboxid') inboxId: string,
    @Query('accessToken') accessToken: string,) {
    return this.gmailInboxService.getInbox(inboxId, accessToken);
  }


  @Get('gmail/inbox/unread')
  getInboxUnread(
    @Query('inboxid') inboxId: string,
    @Query('accessToken') accessToken: string,
  ) {
    console.log('in route:::')
    return this.gmailInboxService.getInboxUnread(inboxId, accessToken);
  }


  @Get('gmail/sent')
  getSentmessage(
    @Query('inboxid') inboxId: string,
    @Query('accessToken') accessToken: string,
  ) {
    return this.gmailInboxService.getSentMessage(inboxId, accessToken);
  }

  @Get('gmail/draft')
  getDraftMessage(
    @Query('inboxid') inboxId: string,
    @Query('accessToken') accessToken: string,
  ) {
    return this.gmailInboxService.getDraftMessage(inboxId, accessToken);
  }


  @Get('gmail/inbox/readmessage')
  getReadMessage(@Query('messageId') messageId: string,
    @Query('inboxid') inboxId: string,
    @Query('accessToken') accessToken: string,
  ) {
    return this.gmailInboxService.getReadMessage(messageId, inboxId, accessToken)
  }

  @Post('generate-response')
  async generateEmailResponse(@Body() data: { prompt: string, input: string }) {
    const response = await this.gmailSendService.generateEmailResponse(data.prompt, data.input);
    return { response };
  }

  @Post('send-email')
  async sendEmail(@Body() emailContent: any): Promise<AxiosResponse<any>> {
    return this.gmailSendService.sendMail(emailContent);
  }

}
