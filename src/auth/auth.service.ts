import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../user/user.repository';
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { OauthClientService } from '../oauth-client/oauth-client.service';
import { UserScopeRepository } from '../user-scope/user-scope.repository';
import { OauthScopeService } from '../oauth-scope/oauth-scope.service';
import { OauthServiceService } from '../oauth-service/oauth-service.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(UserScopeRepository) private userScopeRepo: UserScopeRepository,
    private jwtService: JwtService,
    private oauthClientService: OauthClientService,
    private oauthServiceService: OauthServiceService,
    private oauthScopeService: OauthScopeService
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

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, { secret: "afs01" })
      .then(res => {
        return {
          message: "Token is valid",
          token,
          payload: res
        }
      })
      .catch(err => {
        throw new BadRequestException("Token is invalid")
      })
  }

  async grantScopes(token: string, newScopes: string[], serviceUrl: string) {
    const data = await this.verifyToken(token);

    if (_.get(data, "payload.type") === "grant") throw new BadRequestException("Cannot grant scope with this token")

    const userId = _.get(data, "payload.id")

    const service = await this.oauthServiceService.findServiceByUrl(serviceUrl);

    const grantScopes = [];

    for (const scope of newScopes) {
      const foundScope = await this.oauthScopeService.getScope(scope, service.id)

      const foundUserScope = await this.userScopeRepo.find({
        where: {
          userId,
          oauthScopeId: foundScope.id
        }
      })

      if (foundUserScope) {
        grantScopes.push(scope);
      }
    }

    const payload = {
      ..._.pick(data.payload, ["iss", "sub", "id", "email", "fullName", "avatarUrl", "clientId"]),
      scopes: grantScopes,
      type: "grant"
    }

    return {
      message: "Grant scopes successfully",
      token: this.jwtService.sign(payload),
      payload
    }
  }
}