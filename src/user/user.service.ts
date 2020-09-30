import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserClientRepository } from '../user-client/user-client.repository';
import { OauthClientService } from '../oauth-client/oauth-client.service';
import { UserScopeRepository } from '../user-scope/user-scope.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(UserClientRepository) private userClientRepo: UserClientRepository,
    @InjectRepository(UserScopeRepository) private userScopeRepo: UserScopeRepository,
    private oauthClientService: OauthClientService
  ) { }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email })
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    // hash password ==> typeorm hook (BeforeInsert, BeforeUpdate)

    const newUser = await this.userRepo.create(data).save();

    const client = await this.oauthClientService.getClientByName("MediumClient")

    await this.userClientRepo.create({
      userId: newUser.id,
      oauthClientId: client.id
    })
      .save()

    await this.userScopeRepo.create({
      userId: newUser.id,
      oauthScopeId: "4f9f1452-3b45-45ff-8380-640a640f735a"
    })
      .save()

    await this.userScopeRepo.create({
      userId: newUser.id,
      oauthScopeId: "00f795fe-cf9e-450d-8a61-56d4d991f217"
    })
      .save()

    return newUser;
  }
}