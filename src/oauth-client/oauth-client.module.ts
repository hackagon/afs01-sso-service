import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OauthClientRepository } from './oauth-client.repository';
import { OauthClientService } from './oauth-client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthClientRepository])
  ],
  providers: [OauthClientService]
})
export class OauthClientModule { };