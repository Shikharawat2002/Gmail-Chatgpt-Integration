
import { Body, Controller, Get, Param, Post, Query, Render, Req, Res, UseGuards, NestMiddleware } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GmailInboxService } from './gmailInbox.service';
import { GmailSendService } from './gmailSend.service';
import { AxiosResponse } from 'axios';
import { threadId } from 'worker_threads';

@Controller('google')
export class GmailController {
  constructor(
    private readonly gmailInboxService: GmailInboxService,
    private readonly gmailSendService: GmailSendService,
  ) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Res() res) {
  }


  @Get('redirect')
  @Render('threads.hbs')
  @UseGuards(AuthGuard('google'))
  async getMailByThreadId(@Req() req) {
    //user Info
    const user = {
      accessToken: req?.user?.accessToken,
      email: req?.user?.email
    }
    const myMail = await this.gmailInboxService.getMailByThreadId(user.email, user.accessToken);
    let userDetails = [];
    myMail.forEach(element => {
      // console.log("element:;", element)
      userDetails.push({
        id: element.id,
        snippet: element.snippet,
        accessToken: user.accessToken,
        email: user.email
      })
    })
    // console.log("userDetails", userDetails)
    // console.log("accessToken", user.accessToken)
    return { message: userDetails }
  }


  @Get('threaddetails')
  @Render('chat.hbs')
  async getThreadMessage(
    @Query('id') id: string,
    @Query('accessToken') accessToken: string,
    @Query('email') email: string,
  ) {
    try {
      // const result = await this.gmailInboxService.getThreadMessage(id, accessToken);
      // console.log("id on threads::", id);
      // console.log("accessToken thread", accessToken);
      // console.log("email thread", email);
      const details = await this.gmailInboxService.getUserDetails(id, accessToken, email);
      // console.log('details::', details)
      // console.log("details.data", details)
      const temp = details?.data?.messages;

      // const from = temp[temp.length - 1]?.payload.headers.filter((From) => From.name === 'From')
      if (temp) {
        const from = temp[temp.length - 1]?.payload.headers.find((From) => From.name === 'From')
        const to = temp[temp.length - 1]?.payload.headers.find((To) => To.name === 'To')
        const subject = temp[temp.length - 1]?.payload.headers.find((Subject) => Subject.name === 'Thread-Topic')
        const reference = temp[temp.length - 1]?.payload.headers.find((References) => References.name === 'References')
        const replyTo = temp[temp.length - 1]?.payload.headers.find((replyTo) => replyTo.name === 'In-Reply-To')
        // console.log("From:::::", from?.value)
        // console.log("To::::", to?.value)
        // console.log("subject::::", subject?.value)

        return {
          message: {
            result: details?.message,
            from: from?.value,
            to: to?.value,
            subject: subject?.value,
            reference: reference?.value,
            replyTo: replyTo?.value
          }
        }
      }
    } catch (error) {
      console.error(error);
      return { message: 'Error fetching messages' };
    }
  }


  @Post('send-email')
  async sendEmail(@Req() req,
    @Body() emailContent: any): Promise<AxiosResponse<any>> {
    const refererHeader = req.headers['referer'];
    if (refererHeader) {
      // Extracting values from the Referer header
      const refererUrl = new URL(refererHeader);
      const httpContentId = refererUrl.searchParams.get('id');
      const accessToken = refererUrl.searchParams.get('accessToken');
      emailContent.threadId = httpContentId;
      emailContent.accessToken = accessToken;
      // console.log("EmailContent", emailContent)
    }
    return this.gmailSendService.sendMail(emailContent);
  }


  @Post('generate-response')
  // @Render('test.hbs')
  async generateEmailResponse(@Body() data: { prompt: string, snippet: string }) {
    const response = await this.gmailSendService.generateEmailResponse(data.prompt, data.snippet);
    // console.log('response:::', response)
    return { messageResponse: response };
  }
}





//   @Get('/test')
//   @Render('test.hbs')
//   async root(@Query('messageID') messageID?: string, @Query('email') email?: string, @Query('accessToken') accessToken?: string) {
//     const mailDetail = {
//       messageID: messageID,
//       email: email,
//       accessToken: accessToken
//     }
//     // console.log("mailDetail", mailDetail)
//     console.log("accessToken", accessToken)
//     const myMessage = await this.gmailInboxService.getReadMessage(messageID, email, accessToken)
//     console.log("mymessage", myMessage);
//     const message = myMessage?.snippet;
//     const date = myMessage?.payload?.headers?.find((date) => date.name === 'Date');
//     const from = myMessage?.payload?.headers?.find((sender) => sender.name === 'From');
//     const response = {
//       message: message,
//       from: from.value,
//       date: date.value
//     }
//     console.log("mymessage:::", response);
//     return { message: response };
//   }



//   @Get('mail')
//   getmailList(@Query('inboxid') inboxId: string, @Query('accessToken') accessToken: string,) {
//     return this.gmailInboxService.getMailList(inboxId, accessToken);
//   }


//   @Get('gmail/inbox')
//   getInbox(@Query('inboxid') inboxId: string,
//     @Query('accessToken') accessToken: string,) {
//     return this.gmailInboxService.getInbox(inboxId, accessToken);
//   }


//   @Get('gmail/inbox/unread')
//   getInboxUnread(
//     @Query('inboxid') inboxId: string,
//     @Query('accessToken') accessToken: string,
//   ) {
//     console.log('in route:::')
//     return this.gmailInboxService.getInboxUnread(inboxId, accessToken);
//   }


//   @Get('gmail/sent')
//   getSentmessage(
//     @Query('inboxid') inboxId: string,
//     @Query('accessToken') accessToken: string,
//   ) {
//     return this.gmailInboxService.getSentMessage(inboxId, accessToken);
//   }

//   @Get('gmail/draft')
//   getDraftMessage(
//     @Query('inboxid') inboxId: string,
//     @Query('accessToken') accessToken: string,
//   ) {
//     return this.gmailInboxService.getDraftMessage(inboxId, accessToken);
//   }

//   @Get('readmessage')
//   getReadMessage(@Query('messageId') messageId: string,
//     @Query('inboxid') inboxId: string,
//     @Query('accessToken') accessToken: string,
//   ) {

//     return this.gmailInboxService.getReadMessage(messageId, inboxId, accessToken)
//   }