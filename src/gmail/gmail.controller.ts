
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';

@Controller('google')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.gmailService.googleLogin(req)
  }
}