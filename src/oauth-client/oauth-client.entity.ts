import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserClientEntity } from '../user-client/user-client.entity';

@Entity({ name: "oauth_client" })
export class OauthClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  url: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // relations
  @OneToMany(type => UserClientEntity, e => e.oauthClientId, {
    cascade: true
  })
  userClients: UserClientEntity[]
}