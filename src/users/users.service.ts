import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private lastId = 0;

  findUser(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  createUser(user: Omit<User, 'id'>): User {
    this.lastId++;
    const newUser: User = {
      id: this.lastId.toString(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  getAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  updateUser(id: string, updateData: Partial<User>): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = { ...this.users[userIndex], ...updateData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}