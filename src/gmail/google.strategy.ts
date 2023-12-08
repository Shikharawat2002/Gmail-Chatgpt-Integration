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
      scope: ['email', 'profile', 'https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send'],
      passReqToCallback: false,
      access_type: 'offline',
      prompt: 'consent',

    });

  }


  async validate(accessToken: any, refreshToken: any, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails } = profile
    console.log("profile", profile)
    console.log('refreshToken before:::', refreshToken)
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      refreshToken
    }
    console.log("RefreshToken:::", refreshToken);
    console.log("accessToken", accessToken)
    return done(null, user);
  }
}

