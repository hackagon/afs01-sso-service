import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller("/auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req, @Body("clientId") clientId: string) {
    return this.authService.login(req.user, clientId)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  async getMe(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get("/facebook")
  async getFacebookToken(@Request() req) {
    return req.user;
  }
}