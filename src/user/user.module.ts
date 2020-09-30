import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserClientRepository } from '../user-client/user-client.repository';
import { OauthClientModule } from '../oauth-client/oauth-client.module';
import { UserScopeRepository } from '../user-scope/user-scope.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserClientRepository, UserScopeRepository]),
    OauthClientModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }