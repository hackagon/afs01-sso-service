import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OauthScopeEntity } from '../oaut-scope/oauth-scope.entity';

@Entity({ name: "user_scope" })
export class UserScopeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, e => e.userScopes, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @ManyToOne(type => OauthScopeEntity, e => e.userScopes, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "oauth_scope_id" })
  oauthScopeId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}