import { IsNotEmpty, IsEmail, Min, MinLength } from "class-validator"
import { IsMatch } from "src/validator/is-match.decorator";

export class CreateUserDTO {
  // not empty
  // unique
  // valid
  @IsNotEmpty()
  @IsEmail()
  // unique email
  email: string;

  // not empty
  // min: 6 chars
  @IsNotEmpty() // Chi IsNotEmpty khi dang ky bang app cua minh (ko xai fb, gg)
  @MinLength(6)
  password: string;

  // not empty
  @IsMatch("password", { message: "Confirm Password Should Match" })
  password2: string;

  @IsNotEmpty()
  fullName: string

  avatarUrl?: string
  bio?: string;
}