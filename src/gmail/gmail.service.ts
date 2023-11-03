import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
const imaps = require('imap-simple');
// import { simpleParser } from 'mailparser';
// import _ from 'lodash';


// Initialize the OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
    '277824635101-k3aogsdivvl06bo4v366evrk2t63o9vs.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/google/redirect'
);

// Set the desired scopes
const scopes = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.readonly'
];



// Set the OAuth2 client's scopes

// Use the OAuth2 client for Gmail API requests

@Injectable()
export class GmailService {
    private gmail: any;
    constructor() {
        // Initialize the Gmail API with your credentials
        this.gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client,
        });
    }


    googleLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: req.user
        }
    }

    // Create a Gmail API client
    // async getInboxMessages(accessToken: string) {
    //     oauth2Client.setCredentials({ access_token: accessToken, scope: 'https://mail.google.com/' });
    //     // Set the access token for making requests
    //     // this.gmail.options({ auth: accessToken });

    //     try {
    //         // Fetch the user's inbox messages
    //         console.log('hi', JSON.stringify(this.gmail.users.messages.list({ userId: 'me' })))
    //         // const response = await this.gmail.users.messages.list({
    //         //     access_token: accessToken,
    //         //     userId: 'me',
    //         //     labelIds: ['INBOX'], // Fetch messages from the inbox
    //         // });
    //         // console.log("response", response)


    //         // // Extract the list of messages
    //         // const messages = response.data.messages;
    //         // console.log("messages", messages)

    //         // // You can iterate through the messages and fetch their details if needed
    //         // return messages;
    //     } catch (error) {
    //         // Handle errors
    //         throw error;
    //     }
    // }

    async getEmailSubject() {
        console.log('here in function:::')
        const config = {
            imap: {
                user: 'shikhatesting98@gmail.com',
                password: 'Shikha@95',
                host: 'imap.gmail.com',
                port: 993,
                tls: false,
                authTimeout: 3000
            }
        };
        console.log('before confi:::')
        imaps.connect(config).then(function (connection) {
            console.log('setting:::')
            return connection.openBox('INBOX').then(function () {
                var searchCriteria = [
                    'UNSEEN'
                ];

                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                };

                return connection.search(searchCriteria, fetchOptions).then(function (results) {
                    var subjects = results.map(function (res) {
                        return res.parts.filter(function (part) {
                            return part.which === 'HEADER';
                        })[0].body.subject[0];
                    });
                    console.log(subjects);
                });
            });
        });
    }




}
