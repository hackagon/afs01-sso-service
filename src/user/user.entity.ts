import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserClientEntity } from '../user-client/user-client.entity';
import { UserScopeEntity } from '../user-scope/user-scope.entity';

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  appName: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column({ name: "avatar_url", nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  bio: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // RELATIONs
  @OneToMany(type => UserClientEntity, e => e.userId, {
    cascade: true
  })
  userClients: UserClientEntity[]

  @OneToMany(type => UserScopeEntity, e => e.userId, {
    cascade: true
  })
  userScopes: UserScopeEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // check xem, password co su thay doi

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}