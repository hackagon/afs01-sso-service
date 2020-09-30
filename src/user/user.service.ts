import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserClientRepository } from '../user-client/user-client.repository';
import { OauthClientService } from '../oauth-client/oauth-client.service';
import { UserScopeRepository } from '../user-scope/user-scope.repository';
import { OauthScopeService } from '../oauth-scope/oauth-scope.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(UserClientRepository) private userClientRepo: UserClientRepository,
    @InjectRepository(UserScopeRepository) private userScopeRepo: UserScopeRepository,
    private oauthClientService: OauthClientService,
    private oauthScopeService: OauthScopeService
  ) { }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email })
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    console.log("UserService -> data", data)
    // hash password ==> typeorm hook (BeforeInsert, BeforeUpdate)

    const newUser = await this.userRepo.create(data).save();

    const client = await this.oauthClientService.getClientByName("MediumClient")

    await this.userClientRepo.create({
      userId: newUser.id,
      oauthClientId: client.id
    })
      .save()

    const readScope = await this.oauthScopeService.getScopeByName("read")
    const writeScope = await this.oauthScopeService.getScopeByName("write")

    await this.userScopeRepo.create({
      userId: newUser.id,
      oauthScopeId: readScope.id
    })
      .save()

    await this.userScopeRepo.create({
      userId: newUser.id,
      oauthScopeId: writeScope.id
    })
      .save()

    return newUser;
  }
}