import { Injectable } from '@nestjs/common';

// Defines the structure for a User object
export interface User {
  id: number;
  username: string;
  password: string; // WARNING: In a real app, this MUST be a HASHED password!
  role?: string;
}

@Injectable()
export class UsersService {
  // Simple in-memory storage for demonstration purposes
  // NOTE: Data will be lost when the server restarts
  private users: User[] = [];

  /**
   * Finds a user by their unique username.
   * @param username The username to search for.
   * @returns The User object or undefined if not found.
   */
  findUser(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  /**
   * Creates a new user record.
   * @param user Object containing username, password, and optional role.
   * @returns The newly created User object.
   */
  createUser(user: { username: string; password: string; role?: string }): User {
    const newUser: User = {
      // Simple sequential ID generation
      id: this.users.length + 1, 
      username: user.username,
      password: user.password,
      role: user.role || 'user', // Defaults role to 'user'
    };
    this.users.push(newUser);
    return newUser;
  }
  
  // You can add other utility methods here if needed, like:
  /*
  // Get all users
  getAll(): User[] {
    return this.users;
  }
  
  // Find user by ID
  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
  */
}