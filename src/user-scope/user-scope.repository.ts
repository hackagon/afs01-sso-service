import { EntityRepository, Repository } from "typeorm";
import { UserScopeEntity } from './user-scope.entity';

@EntityRepository(UserScopeEntity)
export class UserScopeRepository extends Repository<UserScopeEntity>{ }