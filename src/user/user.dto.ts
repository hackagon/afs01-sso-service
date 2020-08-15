export class CreateUserDTO {
  // not empty
  // unique
  // valid
  email: string;

  // not empty
  // min: 6 chars
  password: string;

  // not empty
  // match
  password2: string;

  avatarUrl: string
  bio: string;
}