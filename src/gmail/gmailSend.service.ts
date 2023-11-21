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
    this.openai = new OpenAI({ apiKey: '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' });
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
          user: "shikha.rawat@ailoitte.com", // Replace with your Gmail email
          // You don't need to provide a password if you're using OAuth2
          type: "OAuth2",
          accessToken: process.env.ACCESS_TOKEN,
          // More auth options if needed
        },
      });

      const mailOptions = {
        from: "shikha.rawat@ailoitte.comm", // Replace with your Gmail email
        to: emailContent.to,
        subject: emailContent.subject,
        text: emailContent.text,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  generateEmailResponse(prompt: string, input: string): Promise<string> {
    return this.openai.completions.create({
      prompt: prompt + input,
      max_tokens: 50,
      model: 'text-davinci-002'
    })
      .then((response) => {
        return response.choices[0].text;
      })
      .catch((error) => {
        console.error('Error generating email response:', error);
        throw error;
      });
  }

}



