import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserClientRepository } from '../user-client/user-client.repository';
import { OauthClientService } from '../oauth-client/oauth-client.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(UserClientRepository) private userClientRepo: UserClientRepository,
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

    return newUser;
  }
}