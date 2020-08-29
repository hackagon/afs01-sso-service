import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { OauthScopeEntity } from '../oauth-scope/oauth-scope.entity';

@Entity({ name: "oauth_service" })
export class OauthServiceEntity extends BaseEntity {
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

  // relations
  @OneToMany(type => OauthScopeEntity, e => e.oauthServiceId, {
    cascade: true
  })
  oauthScopes: OauthScopeEntity[]
}