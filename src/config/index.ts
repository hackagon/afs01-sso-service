import * as dotenv from "dotenv";
import * as path from "path";

export const NODE_ENV = process.env.NODE_ENV || "local";
const envPath = path.join(__dirname, "../..", `.env.${NODE_ENV}`)

dotenv.config({
  path: envPath
})

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;