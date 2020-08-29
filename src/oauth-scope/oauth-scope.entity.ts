import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OauthServiceEntity } from '../oauth-service/oauth-service.entity';
import { UserScopeEntity } from '../user-scope/user-scope.entity';

@Entity({ name: "oauth_scope" })
export class OauthScopeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => OauthServiceEntity, e => e.oauthScopes, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "oauth_service_id" })
  oauthServiceId: string;

  @Column()
  scope: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relations
  @OneToMany(type => UserScopeEntity, e => e.oauthScopeId, {
    cascade: true
  })
  userScopes: UserScopeEntity[]
}