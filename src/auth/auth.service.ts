import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../user/user.repository';
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService
  ) { }

  async validateCredentials(email: string, password: string) {
    const foundUser = await this.userRepo.findOne({ email });
    if (!foundUser) throw new NotFoundException("User Not Exist");
    if (foundUser.password !== password) return null;
    return foundUser
  }

  login(user: any): any {
    const payload = _.pick(user, ["id", "email", "fullName", "avatarUrl"])
    return {
      message: "Login successfully",
      token: this.jwtService.sign(payload)
    }
  }
}