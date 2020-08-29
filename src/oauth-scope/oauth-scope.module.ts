import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OauthScopeRepository } from './oauth-scope.repository';
import { OauthScopeService } from './oauth-scope.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthScopeRepository])
  ],
  providers: [OauthScopeService]
})
export class OauthScopeModule { }