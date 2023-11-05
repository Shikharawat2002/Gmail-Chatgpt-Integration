import { Injectable } from '@nestjs/common';
import { google, oauth2_v2 } from 'googleapis';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
@Injectable()
export class GmailInboxService {
    generateConfig(url: string, accessToken: string): AxiosRequestConfig {
        return {
            method: "get",
            url: url,
            headers: {
                Authorization: `Bearer ${accessToken} `,
                "Content-type": "application/json",
            },
        };
    };

    async getInbox(): Promise<AxiosResponse<any>> {
        try {
            // console.log('process', process.env.ACCESS_TOKEN);
            const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/messages`;
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const token = process.env.ACCESS_TOKEN;
            const config = this.generateConfig(url, token);
            const response = await axios(config);
            // console.log('res', response)
            return response.data.messages;
            // return response.data.drafts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getReadMessage(messageId): Promise<AxiosResponse<any>> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/messages/${messageId}`;
            const token = process.env.ACCESS_TOKEN;
            const config = this.generateConfig(url, token);
            const response = await axios(config);
            // console.log('res', response)
            return response.data;
            // return response.data.drafts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


}
