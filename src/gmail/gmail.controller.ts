
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
    if (myMail) {
      myMail.forEach(element => {
        // console.log("element:;", element)
        userDetails.push({
          id: element.id,
          snippet: element.snippet,
          accessToken: user.accessToken,
          email: user.email
        })
      })
    }
    else {
      userDetails.push({
        id: '1',
        snippet: 'no mail',
        accessToken: user.accessToken,
        email: user.email
      })
    }
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
      const details = await this.gmailInboxService.getUserDetails(id, accessToken, email);
      const temp = details?.data?.messages;

      if (temp) {
        const from = [];
        const to = [];

        for (let i = 0; i < temp.length; i++) {
          const iterator = temp[i]?.payload?.headers;

          // Use find instead of filter, and then access the value property
          const fromHeader = iterator.find((header) => header.name === 'From');
          from.push(fromHeader?.value ?? '');

          // The same applies to 'To' header
          const toHeader = iterator.find((header) => header.name === 'To');
          to.push(toHeader?.value ?? '');
        }

        const lastMessage = temp[temp.length - 1]?.payload?.headers;

        // Access headers safely, provide default values if they are undefined
        const subject = lastMessage?.find((header) => header.name === 'Subject')?.value ?? '';
        const Message_Id = lastMessage?.find((header) => header.name === 'Message-ID')?.value ?? '';
        const reference = lastMessage?.find((header) => header.name === 'References')?.value ?? '';
        const replyTo = lastMessage?.find((header) => header.name === 'In-Reply-To')?.value ?? '';

        console.log("From:::::", from);
        console.log("To::::", to);
        console.log("subject::::", subject);

        const res = [];
        for (let i = 0; i < details?.message.length; i++) {
          const resFrom = from[i] ?? '';
          const resTo = to[i] ?? '';

          res.push({
            from: resFrom,
            to: resTo,
            message: details.message[i]
          });
        }

        return {
          message: {
            subject: subject,
            reference: reference,
            replyTo: replyTo,
            Message_Id: Message_Id,
            currentEmailId: email,
            threadId: id,
            accessToken: accessToken
          },
          res
        };
      }
    } catch (error) {
      console.error(error);
      return { message: 'Error fetching messages' };
    }
  }


  @Post('send-email')
  async sendEmail(@Req() req,
    @Body() emailContent: any): Promise<AxiosResponse<any>> {
    console.log("emailContent in send mail::", emailContent)
    const refererHeader = req.headers['referer'];
    // if (refererHeader) {
    //   // Extracting values from the Referer header
    //   const refererUrl = new URL(refererHeader);
    //   const httpContentId = refererUrl.searchParams.get('id');
    //   const accessToken = refererUrl.searchParams.get('accessToken');
    //   const email = refererUrl.searchParams.get('email')
    //   console.log("email for middleware", email)
    //   emailContent.threadId = httpContentId;
    //   emailContent.accessToken = accessToken;
    //   emailContent.email = email;
    //   // console.log("EmailContent", emailContent)
    // }
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