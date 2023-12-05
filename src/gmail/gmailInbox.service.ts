import { ConsoleLogger, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
@Injectable()
export class GmailInboxService {
    // create config 
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

    async getTest() {
        return "hello";
    }

    googleLogin(req) {
        // console.log('req:::', req.user.accessToken)
        console.log("Redirected successfully")
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: JSON.stringify(req.user)
        }
    }

    async getInbox(id: string, accessToken: string): Promise<any> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:inbox`;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let messages = response.data.messages;
            // console.log(response.data.messages);
            return response.data.messages;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    async getMailByThreadId(userId: string, accessToken: string) {
        try {
            //   const url = `https://gmail.googleapis.com/gmail/v1/users/${userId}/threads/${threadId}`;
            const url = `https://gmail.googleapis.com/gmail/v1/users/${userId}/threads`;

            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            return response.data.threads;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getUserDetails(id: string, accessToken: string, email) {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/threads/${id} `;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            const data = response.data;
            // console.log(" user details data::", data)
            // console.log("Respose getUserDetails", response)


            const temp = response.data?.messages[0].payload.parts[0]?.body?.data
            // console.log("TEMP:::", temp)
            // console.log("temp", temp)
            const message = [];
            const result = data?.messages?.map((index) => {
                const payloads = index?.payload?.parts[0]?.body?.data

                if (payloads) {
                    const decodedResponse = Buffer.from(payloads, 'base64').toString('utf-8');
                    console.log("DR:::::::", decodedResponse)
                    message.push(decodedResponse);
                }
                return null;
            })
            console.log("message:::::::::::::", message)
            // return messsage[messsage.length - 1];
            return { data, message };
        } catch (err) {
            return err;
        }
    }


    async getMailList(inboxid: string, accessToken: string): Promise<any> {
        try {
            const mails = await this.getInbox(inboxid, accessToken);
            // console.log("mails::", mails)

            if (mails !== null) {
                const messageID = (mails as { id?: string }[]).map((item) => item?.id);

                if (messageID !== null) {
                    // Use Promise.all to wait for all asynchronous operations to complete
                    const readMessages = await Promise.all(
                        messageID.map(async (item) => {
                            const readMessage = await this.getReadMessage(item, inboxid, accessToken);
                            // console.log("readMessage", readMessage);
                            return readMessage;
                        })
                    );

                    // Return the array of read messages
                    return readMessages;
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    // async getMailList(inboxid: string, accessToken: string) {
    //     try {
    //         const mails = await this.getInbox(inboxid, accessToken);

    //         if (mails !== null) {
    //             // console.log("RESPONSE GET MAIL", mails);
    //             const messageID = (mails as { id?: string }[]).map((item) => item?.id);
    //             // console.log("messageID", messageID);
    //             if (messageID !== null) {
    //                 messageID.map(async (item) => {
    //                     const readMessage = await this.getReadMessage(item, inboxid, accessToken);
    //                     // console.log("MAPED message");
    //                     console.log("readMEssage", readMessage);
    //                     return readMessage;
    //                 })
    //             } else {
    //                 return 'NO messages found!!';
    //             }
    //         } else {
    //             console.log("No emails found.");
    //         }
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    // async getMailList(id: string, accessToken: string): Promise<{}> {
    //     try {
    //         // console.log('in service:::')
    //         // console.log('process', process.env.ACCESS_TOKEN);
    //         // const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:inbox+is:unread`;

    //         // const url = `https://gmail.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/gmail.labels`; //https://www.googleapis.com/auth/gmail.labels
    //         const url = `https://www.googleapis.com/gmail/v1/users/shikha.rawat@ailoitte.com/messages/list`
    //         const config = this.generateConfig(url, accessToken);
    //         const response = await axios(config);
    //         console.log('response list:::', response)
    //         // console.log("Data:::", response?.data)
    //         // return response.data.messages;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    async getInboxUnread(id: string, accessToken: string): Promise<string[]> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:inbox+is:unread`;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            return response.data.messages;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getSentMessage(id: string, accessToken: string): Promise<AxiosResponse<any>> {
        try {

            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages?q=label:sent`;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let message = response.data.messages;
            return message;
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
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            let messages = response.data.messages;
            console.log('messages', messages); -
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



    async getReadMessage(messageId: string, id: string, accessToken: string): Promise<any> {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/${id}/messages/${messageId}?format=full`;
            const config = this.generateConfig(url, accessToken);
            const response = await axios(config);
            return response?.data;
            // return response.data.drafts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
// async getThreadMessage(id: string, accessToken: string): Promise<any> {
//     try {
//         const url = `https://gmail.googleapis.com/gmail/v1/users/rawatsikha112@gmail.com/threads/${id} `;
//         const config = this.generateConfig(url, accessToken);
//         const response = await axios(config);
//         const data = response.data;
//         // console.log("Data.messages::", data.messages)
//         const temp = response.data?.messages[0].payload.parts[0]?.body?.data
//         // console.log("TEMP:::", temp)
//         // console.log("temp", temp)
//         const message = [];
//         const result = data?.messages?.map((index) => {
//             const payloads = index?.payload?.parts[0]?.body?.data

//             if (payloads) {
//                 const decodedResponse = Buffer.from(payloads, 'base64').toString('utf-8');
//                 // console.log("DR:::::::", decodedResponse)
//                 message.push(decodedResponse);
//             }
//             return null;
//         })
//         console.log("messages", message)
//         // return message[message.length - 1];
//         return message;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }
