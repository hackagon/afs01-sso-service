import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OauthScopeEntity } from '../oauth-scope/oauth-scope.entity';

@Entity({ name: "user_scope" })
export class UserScopeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => UserEntity, e => e.userScopes, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  userId: string;

  @ManyToOne(type => OauthScopeEntity, e => e.userScopes, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "oauth_scope_id" })
  oauthScopeId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}