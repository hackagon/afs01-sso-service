import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OauthClientRepository } from './oauth-client.repository';
import { OauthClientService } from './oauth-client.service';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthClientRepository]),
    ConsoleModule
  ],
  providers: [OauthClientService],
  exports: [OauthClientService]
})
export class OauthClientModule { };