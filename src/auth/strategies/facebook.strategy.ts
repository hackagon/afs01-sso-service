import { Injectable } from "@nestjs/common";
import { use } from "passport";
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../../config/index';
import { UserService } from '../../user/user.service';
import * as _ from "lodash"

const FacebookTokenStrategy = require("passport-facebook-token");

@Injectable()
export class FacebookStrategy {
  constructor(
    private userService: UserService
  ) {
    this.init();
  }

  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: FACEBOOK_APP_ID,
          clientSecret: FACEBOOK_APP_SECRET,
          fbGraphVersion: "v3.0"
        },
        async (assessToken: string, refreshToken: string, profile: any, done: any) => {
          let user = await this.userService.findUserByEmail(profile._json.id)
          if (!user) {
            // user = await this.userService.createUser({
            //   email: profile._json.id,
            //   fullName: profile._json.name,
            //   avatarUrl: _.get(_.first(_.get(profile, "photos")), "value")
            // })
          }

          return done(null, user)
        }
      )
    )
  }
}