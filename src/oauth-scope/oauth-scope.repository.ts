import { EntityRepository, Repository } from "typeorm";
import { OauthScopeEntity } from './oauth-scope.entity';

@EntityRepository(OauthScopeEntity)
export class OauthScopeRepository extends Repository<OauthScopeEntity>{ }