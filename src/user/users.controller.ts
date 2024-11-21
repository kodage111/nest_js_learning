import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './DTO/update_user_dto';
import { CreateUserDto } from './DTO/create_user_dto';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('role') role?: UserRole) {
    return this.usersService.getUsers(role);
  }

  @Get(':id')
  getUserWithId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserWithId(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
