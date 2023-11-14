import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
const url = require('url');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect', //process.env.REDIRECT_URI,
      scope: ['email', 'profile','https://mail.google.com/','https://www.googleapis.com/auth/gmail.readonly'  ],
      passReqToCallback: false

    });
    // console.log("clientid", process.env.GOOGLE_CLIENT_ID)
    // console.log("clientSecret", process.env.GOOGLE_SECRET)
    // console.log("callbackurl", process.env.REDIRECT_URI)
  }


  async validate(accessToken: any, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log("AccessToken", accessToken);
    // console.log("Profile", profile);
    // const queryParams = url.parse(accessToken.url, true).query;
    // console.log("QueryParams", queryParams)
    // console.log("RefreshToken:::", refreshToken);
    const { name, emails, picture } = profile
    const user = {
      // email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken
    }
    return user;
  }
}