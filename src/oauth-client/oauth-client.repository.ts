import { EntityRepository, Repository } from "typeorm";
import { OauthClientEntity } from './oauth-client.entity';

@EntityRepository(OauthClientEntity)
export class OauthClientRepository extends Repository<OauthClientEntity>{ }