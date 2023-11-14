
import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
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
  async googleAuth(@Req() req, @Res() res) {

    console.log('response::::', res)
  }


  // @Get('auth/google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleLoginCallback(@Req() req: Request, @Res() res: Response) {
  //   console.log("res::::", res)
  // }

  // @Get('auth/google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   console.log('res:::')
  //   return this.gmailService.googleLogin(req);

  // }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.gmailService.googleLogin(req)
  }

  // @Get('mail')
  // getmailList(@Query('inboxid') inboxId: string,
  //   @Query('accessToken') accessToken: string,) {
  //   return this.gmailInboxService.getMailList(inboxId, accessToken)
  // }

  @Get('gmail/inbox/')
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


  @Get('gmail/Inbox/readmessage')
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