import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: '277824635101-k3aogsdivvl06bo4v366evrk2t63o9vs.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/redirect',

      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken
    }
    return user;
  }
}