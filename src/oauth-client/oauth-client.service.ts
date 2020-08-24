import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OauthClientRepository } from './oauth-client.repository';

@Injectable()
export class OauthClientService {
  constructor(
    @InjectRepository(OauthClientRepository) private oauthClientRepo: OauthClientRepository
  ) { }
}