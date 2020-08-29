import { EntityRepository, Repository } from "typeorm";
import { OauthServiceEntity } from './oauth-service.entity';

@EntityRepository(OauthServiceEntity)
export class OauthServiceRepository extends Repository<OauthServiceEntity> { }