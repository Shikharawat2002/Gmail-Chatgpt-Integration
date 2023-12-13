import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { OpenAI } from 'openai';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { google } from 'googleapis';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class GmailSendService {
  private openai;
  private oAuth2Client;

  constructor() {
    // Initialize the OpenAI API client with your API key
    this.openai = new OpenAI({ apiKey: process.env.CHATGPT_API });
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    this.oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
  }


  // async sendMail(emailContent: any): Promise<SentMessageInfo> {
  //   try {
  //     const transport = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: emailContent.from,
  //         type: 'OAuth2',
  //         accessToken: emailContent.accessToken,
  //       },
  //     });

  //     let deliverTo;
  //     if (emailContent.currentEmailId === emailContent.to) {
  //       deliverTo = emailContent.from;
  //     } else {
  //       deliverTo = emailContent.to;
  //     }

  //     const mailOptions = {
  //       from: emailContent.currentEmailId,
  //       to: deliverTo,
  //       subject: emailContent.subject || 'No Subject',
  //       text: emailContent.chatgptResponse,
  //       inReplyTo: emailContent.replyTo,
  //       references: emailContent.reference,
  //     };

  //     console.log("mailoptions", mailOptions);

  //     const result = await transport.sendMail(mailOptions);
  //     console.log('result in service:::', result);
  //     return result;
  //   } catch (error) {
  //     console.log("error in service:::", error);
  //     return error;
  //   }
  // }

  async sendMail(emailContent: any): Promise<any> {
    try {
      console.log("emaildata:?:", emailContent)
      let deliverTo;
      if (emailContent.currentEmailId === emailContent.to) {
        deliverTo = emailContent.from;
      } else {
        deliverTo = emailContent.to;
      }
      console.log("deliverTo::", deliverTo)
      const userId = emailContent.currentEmailId;

      // Construct the RFC822 formatted email payload
      const emailPayload = `From: ${userId}
To: ${deliverTo}
Subject: ${emailContent.subject}
Message-ID: ${emailContent.Message_ID}
In-Reply-To: ${emailContent.inReplyTo}
References: ${emailContent.reference}
Content-Type: text/plain; charset="UTF-8"
${emailContent.chatgptResponse}`;

      // Encode email content in Base64
      const encodedEmailContent = Buffer.from(emailPayload).toString('base64');

      console.log("encodedEmailContent::", encodedEmailContent);

      // Construct the request payload
      const requestPayload = {
        raw: encodedEmailContent,
      };

      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${emailContent.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        }
      );

      const responseData = await response.json();

      // Return the response from the Gmail API
      console.log("send response data", responseData);
      return responseData;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }



  generateEmailResponse(prompt: string, input: string): Promise<string> {
    return this.openai.completions.create({
      prompt: prompt + input,
      max_tokens: 600,
      model: 'text-davinci-002'
    })
      .then((response) => {
        // console.log("Response.choice", response.choices[0].text)
        return response.choices[0].text;
      })
      .catch((error) => {
        console.error('Error generating email response:', error);
        throw error;
      });
  }

}



