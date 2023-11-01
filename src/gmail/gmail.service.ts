import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailService {
    googleLogin(req) {
      if (!req.user) {
        return 'No user from google'
      }
  
      return {
        message: 'User information from google',
        user: req.user
      }
    }
  }
// export class GmailService {
//     private gmail: any;
//     constructor() {
//         // Initialize the Gmail API with your credentials
//         this.gmail = google.gmail('v1');
//     }

//     googleLogin(req) {
//         if (!req.user) {
//             return 'No user from google'
//         }

//         return {
//             message: 'User information from google',
//             user: req.user
//         }
//     }


//     async getInboxMessages(accessToken: string) {
//         // Set the access token for making requests
//         this.gmail.options({ auth: accessToken });

//         try {
//             // Fetch the user's inbox messages
//             const response = await this.gmail.users.messages.list({
//                 userId: 'me',
//                 labelIds: ['INBOX'], // Fetch messages from the inbox
//             });

//             // Extract the list of messages
//             const messages = response.data.messages;

//             // You can iterate through the messages and fetch their details if needed
//             return messages;
//         } catch (error) {
//             // Handle errors
//             throw error;
//         }
//     }
// }