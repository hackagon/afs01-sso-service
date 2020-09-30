import { Controller, Post, UseGuards, Request, Get, Body, Query } from '@nestjs/common';
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

  @Post("/verify")
  async verifyToken(@Query("token") token: string) {
    return this.authService.verifyToken(token);
  }

  @Post("/grant_scopes")
  async grantScopes(
    @Query("token") token: string,
    @Body("scopes") scopes: string[],
    @Body("serviceUrl") serviceUrl: string
  ) {
    return this.authService.grantScopes(token, scopes, serviceUrl)
  }
}