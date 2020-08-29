import { EntityRepository, Repository } from "typeorm"
import { UserClientEntity } from './user-client.entity';

@EntityRepository(UserClientEntity)
export class UserClientRepository extends Repository<UserClientEntity> { }