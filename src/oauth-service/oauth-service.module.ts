import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OauthServiceRepository } from './oauth-service.repository';
import { OauthServiceService } from './oauth-service.service';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    TypeOrmModule.forFeature([OauthServiceRepository]),
    ConsoleModule
  ],
  providers: [OauthServiceService],
  exports: [OauthServiceService]
})
export class OauthServiceModule { }