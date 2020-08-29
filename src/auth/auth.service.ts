import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../user/user.repository';
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { OauthClientService } from '../oauth-client/oauth-client.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
    private oauthClientService: OauthClientService
  ) { }

  async validateCredentials(email: string, password: string) {
    const foundUser = await this.userRepo.findOne({ email });
    if (!foundUser) throw new NotFoundException("User Not Exist");
    const isMatched = await bcrypt.compare(password, foundUser.password)

    if (!isMatched) return null;

    return foundUser
  }

  async login(user: any, clientId: string): Promise<any> {
    await this.oauthClientService.findClientById(clientId)

    // RFC
    const payload = {
      iss: "http://localhost:5001",
      sub: user.email,
      type: "auth",
      ..._.pick(user, ["id", "email", "fullName", "avatarUrl"]),
      clientId,
      scopes: []
    }

    return {
      message: "Login successfully",
      token: this.jwtService.sign(payload),
      payload
    }
  }
}