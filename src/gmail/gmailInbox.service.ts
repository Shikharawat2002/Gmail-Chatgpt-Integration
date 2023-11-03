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
            const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/messages`;
            // const url = `https://www.googleapis.com/gmail/v1/users/me/messages`
            const token = 'ya29.a0AfB_byCtuWZMF4b_MtjU1kQCL0mSzampLuFKbKbVoXGjhGb3ncs5TRZ1Xq2qGiAjWfxSgD-eB9IxvwZo4RTr5NA6N34YkgcnOgHsDYZjhE8IQnVX2OfUA73BsZv8kT7yiQvpcykfimbfsSTiMuBziTmBqlST_AF8lbIkaCgYKAYASARMSFQGOcNnCPbRsvgc0kVpzcTcF5b5x6Q0171';
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
            const token = 'ya29.a0AfB_byCtuWZMF4b_MtjU1kQCL0mSzampLuFKbKbVoXGjhGb3ncs5TRZ1Xq2qGiAjWfxSgD-eB9IxvwZo4RTr5NA6N34YkgcnOgHsDYZjhE8IQnVX2OfUA73BsZv8kT7yiQvpcykfimbfsSTiMuBziTmBqlST_AF8lbIkaCgYKAYASARMSFQGOcNnCPbRsvgc0kVpzcTcF5b5x6Q0171';
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


    // async getInboxMessages(accessToken: string) {
    //     const auth = new google.auth.OAuth2();
    //     auth.setCredentials({refresh_token: '1//04lxdwHqI3WE5CgYIARAAGAQSNwF-L9IrTJd8foa4aWjqZpeCdPPExTnGgcnQeXFMxy8GGeB1UYGMdzv0Ev1rrOPGLXDCFBdGOuA' });
    //     // console.log("auth",auth)
    //     const gmail = google.gmail({
    //         version: 'v1',
    //         auth,
    //     });

    //     try {
    //         const response = await gmail.users.messages.list({
    //             userId: 'me', // 'me' represents the authenticated user
    //             q: 'in:inbox', // You can specify Gmail search criteria here
    //         });

    //         const messages = response.data.messages;
    //         console.log("Message", messages)
    //         return messages;
    //     } catch (error) {
    //         // Handle any errors that occur during the request
    //         console.error('Error fetching inbox messages:', error);
    //         throw error;
    //     }
    // }

}
