import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OauthScopeRepository } from './oauth-scope.repository';
import { Console, Command } from "nestjs-console";

@Injectable()
@Console()
export class OauthScopeService {
  constructor(
    @InjectRepository(OauthScopeRepository) private oauthScopeRepo: OauthScopeRepository
  ) { }

  @Command({
    command: "get-scopes",
    description: "Get all scopes"
  })
  async getScopes() {
    const scopes = await this.oauthScopeRepo.find();
    console.log(scopes);
    return scopes;
  }

  @Command({
    command: "create-scope <oauthServiceId> <scope>",
    description: "Create a scope"
  })
  async createScope(oauthServiceId: string, scope: string) {
    console.log(oauthServiceId, scope)
    const oauthScope = await this.oauthScopeRepo.create({
      oauthServiceId, scope
    })
      .save()

    console.log(oauthScope)
    return oauthScope;
  }

  async getScope(scope: string, oauthServiceId: string) {
    return await this.oauthScopeRepo.findOne({
      where: {
        scope,
        oauthServiceId
      }
    })
  }

  async getScopeByName(name: string) {
    return await this.oauthScopeRepo.findOne({ where: { scope: name } })
  }
}