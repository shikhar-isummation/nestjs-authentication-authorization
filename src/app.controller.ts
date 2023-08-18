import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO]))
  @Get('sm')
  getData(@Request() req) {
    return `I am CEO. \n ${JSON.stringify(req.user)}`;
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.MANAGER, CONSTANTS.ROLES.CEO]))
  @Get('wm')
  getData1(@Request() req) {
    return `I am Manager.\n ${JSON.stringify(req.user)}`;
  }
}