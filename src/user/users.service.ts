import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create_user_dto';
import { UpdateUserDto } from './DTO/update_user_dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User(1, 'TENE Emmanuel', 'emma@gmail.com', 'ENGINEER'),
    new User(2, 'TAMPO Rai', 'rai237@gmail.com', 'INTERN'),
    new User(3, 'TEUGANOU raissa', 'raissa@gmail.com', 'INTERN'),
    new User(4, 'Oyenga Nadine', 'oyenga@gmail.com', 'ADMIN'),
  ];

  getUsers(role: UserRole): User[] {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
      if (users.length === 0) {
        throw new NotFoundException(`No users found with role: ${role}`);
      }
      return users;
    }
    return this.users;
  }

  getUserWithId(id: number): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): User | undefined {
    const lastUserId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser: User = {
      id: lastUserId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    // this.users = this.users.map((user) => {
    //   if (user.id === id) {
    //     return { ...user, ...updateUserDto };
    //   }
    //   return user;
    // });

    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number): User | undefined {
    const indexOfUser = this.users.findIndex((user) => user.id === id);
    if (indexOfUser) {
      this.users.splice(indexOfUser, 1);
      return this.users[indexOfUser];
    }
    return undefined;
  }
}

export class User {
  public constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ENGINEER = 'ENGINEER',
  INTERN = 'INTERN',
}
