import { Injectable } from '@nestjs/common';
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

    async getInbox(id: string, accessToken: string): Promise<[]> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:inbox`;

            // const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/gmail.labels`; //https://www.googleapis.com/auth/gmail.labels
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let messages = response.data.messages;
            console.log(response.data.messages);
            return response.data.messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // async getMailList(inboxid: string, accessToken: string) {
    //     try {
    //         const mails = await this.getInbox(inboxid, accessToken);
    //         console.log("RESPONSE GET MAIL", mails);
    //         const messageID = mails.map((item) => item?.id);
    //         console.log("messageID", messageID)
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    async getInboxUnread(id: string, accessToken: string): Promise<[]> {
        try {
            // console.log('in service:::')
            // console.log('process', process.env.ACCESS_TOKEN);
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:inbox+is:unread`;

            // const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/gmail.labels`; //https://www.googleapis.com/auth/gmail.labels
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            // console.log('res', response)
            // console.log("Data:::", response?.data)
            return response.data.messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getSentMessage(id: string, accessToken: string): Promise<AxiosResponse<any>> {
        try {

            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:sent`;

            // const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/gmail.labels`; //https://www.googleapis.com/auth/gmail.labels
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let messages = response.data.messages;
            // console.log('messages', messages);
            // (await labels).map((lab, index) => {
            //     messages[index] = { ...messages[index], label: lab };
            // })
            // console.log('res', response)
            return response.data.messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async getDraftMessage(id: string, accessToken: string): Promise<AxiosResponse<any>> {
        try {

            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:drafts`;

            // const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/gmail.labels`; //https://www.googleapis.com/auth/gmail.labels
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const token = process.env.ACCESS_TOKEN;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let messages = response.data.messages;
            console.log('messages', messages);
            // (await labels).map((lab, index) => {
            //     messages[index] = { ...messages[index], label: lab };
            // })
            console.log('res', response)
            return response.data.messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }



    async getReadMessage(messageId: string, id: string, accessToken: string): Promise<AxiosResponse<any>> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages/${messageId}`;
            const config = this.generateConfig(url, accessToken);
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
