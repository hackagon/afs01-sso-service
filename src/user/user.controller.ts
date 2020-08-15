import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDTO } from './user.dto';
import { UserEntity } from "./user.entity";
import { UserService } from './user.service';

@Controller("/users")
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(data);
  }
}