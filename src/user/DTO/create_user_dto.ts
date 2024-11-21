import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email is not valid.',
    },
  )
  email: string;

  @IsEnum(UserRole, {
    message: 'A valid role is required.',
  })
  role: UserRole;
}
