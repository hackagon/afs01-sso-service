import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { UserClientEntity } from '../user-client/user-client.entity';

@Entity({ name: "oauth_client" })
export class OauthClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  url: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relation
  @OneToMany(type => UserClientEntity, e => e.oauthClientId)
  userClients: UserClientEntity[]
}