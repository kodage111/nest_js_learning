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
