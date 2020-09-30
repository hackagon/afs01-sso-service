import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OauthScopeRepository } from './oauth-scope.repository';
import { OauthScopeService } from './oauth-scope.service';
import { OauthServiceModule } from '../oauth-service/oauth-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthScopeRepository])
  ],
  providers: [OauthScopeService],
  exports: [OauthScopeService]
})
export class OauthScopeModule { }