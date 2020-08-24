import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository
  ) { }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email })
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    // hash password ==> typeorm hook (BeforeInsert, BeforeUpdate)

    const newUser = this.userRepo.create(data);
    return await newUser.save()
  }
}