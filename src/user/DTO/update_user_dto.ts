import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create_user_dto';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../users.service';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
