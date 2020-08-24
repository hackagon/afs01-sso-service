import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './datasource/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.modules';
import { OauthClientModule } from './oauth-client/oauth-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    OauthClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
