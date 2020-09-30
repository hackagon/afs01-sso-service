import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from '../user/user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from "@nestjs/jwt"
import { FacebookStrategy } from './strategies/facebook.strategy';
import { UserModule } from '../user/user.module';
import { OauthClientModule } from '../oauth-client/oauth-client.module';
import { UserScopeRepository } from '../user-scope/user-scope.repository';
import { OauthScopeModule } from '../oauth-scope/oauth-scope.module';
import { OauthServiceModule } from '../oauth-service/oauth-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserScopeRepository]),
    PassportModule,
    JwtModule.register({
      secret: "afs01",
      signOptions: {
        expiresIn: "1h"
      }
    }),
    UserModule,
    OauthClientModule, OauthScopeModule, OauthServiceModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy],
  controllers: [AuthController]
})
export class AuthModule { }