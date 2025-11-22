import { 
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create (Admin route)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: { username: string; password: string; role: string }) {
    return this.usersService.createUser(body);
  }

  // Read All
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.getAll();
  }

  // Read One
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // Update
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.usersService.updateUser(id, body);
  }

  // Delete
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}