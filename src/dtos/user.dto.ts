import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class UpdateUserDto {
  @IsEmail()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}
