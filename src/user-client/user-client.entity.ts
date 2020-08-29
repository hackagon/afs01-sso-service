import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';
import { OauthClientEntity } from '../oauth-client/oauth-client.entity';

@Entity({ name: "user_client" })
export class UserClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => UserEntity, e => e.userClients, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  userId: string

  @ManyToOne(type => OauthClientEntity, e => e.userClients, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "oauth_client_id" })
  oauthClientId: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}