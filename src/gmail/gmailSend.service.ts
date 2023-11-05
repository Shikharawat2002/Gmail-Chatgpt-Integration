import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { OpenAI  } from 'openai';
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
        this.oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
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
            to: emailContent.to, // Extract the recipient's email from the request body
            subject: emailContent.subject, // Extract the subject from the request body
            text: emailContent.text, // Extract the email content from the request body
          };
      
          const result = await transport.sendMail(mailOptions);
          return result;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

    // async sendMail(): Promise<SentMessageInfo> {
    //     try {
    //         // Get Gmail access token using OAuth2Client
    //         const accessToken = 'ya29.a0AfB_byDVC4hCSn6QeEyPcDUS9pAgY1d1Q_aca7notlKS8XjxVGMSs-aMe2yYwBqcest7Bv9XJnSa5GzZnKEHlg9ufIISF-9iOZf7KC1kAxSG3gdD3zN680Gr6Xw6F31VL9brcvNq6ri;3jIlSm6KkeeCUC6alwCWhVQMnaCgYKAegSARMSFQGOcNnCXCfcLZRDzt3LwHSrqATwhA0171'

    //         // Create a transporter for sending emails via Gmail
    //         const transport = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'shikha.rawat@ailoitte.com',
    //                 type: 'OAuth2',
    //                 accessToken: accessToken,
    //             },
    //         });

    //         // Define mail options
    //         const mailOptions = {
    //             from: 'shikha.rawat@ailoitte.com',
    //             to: 'rawatsikha112@gmail.com',
    //             subject: 'Test Email',
    //             text: 'The Gmail API with NodeJS works',

    //         };

    //         // Send the email
    //         const result = await transport.sendMail(mailOptions);

    //         return result;
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         throw error;
    //     }
    // }


    generateEmailResponse(prompt: string): Promise<string> {
        return this.openai.completions.create({
            prompt: prompt,
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
