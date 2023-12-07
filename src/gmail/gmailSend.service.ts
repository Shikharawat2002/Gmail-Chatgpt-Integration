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


  async sendMail(emailContent: any): Promise<SentMessageInfo> {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailContent.from, // Replace with your Gmail email
          // You don't need to provide a password if you're using OAuth2
          type: "OAuth2",
          accessToken: emailContent.accessToken,
          // More auth options if needed
        },
      });
      console.log('emailContent::', emailContent)

      const mailOptions = {
        from: emailContent.from, // Replace with your Gmail email
        to: emailContent.to,
        subject: emailContent.subject || 'No Subject',
        text: emailContent.chatgptResponse,
        inReplyTo: emailContent.replyTo, // Set this to the Message-ID of the parent email
        references: emailContent.reference,
      };


      console.log("mailoptions", mailOptions);

      const result = await transport.sendMail(mailOptions);
      console.log('result in service:::', result)
      // return result;
    } catch (error) {
      console.log("error in service:::", error);
      return error;
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



