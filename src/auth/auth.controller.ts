import { 
  Body, Controller, Post, HttpCode, 
  UnauthorizedException, ConflictException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';

interface LoginDto extends Pick<User, 'username' | 'password'> {}
interface RegisterDto extends Pick<User, 'username' | 'password'> {}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    const existingUser = this.usersService.findUser(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const newUser = this.usersService.createUser({
      ...registerDto,
      role: 'user',
    });

    const { password, ...result } = newUser;
    return {
      message: 'User registered successfully',
      user: result,
    };
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    const user = this.usersService.findUser(loginDto.username);

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };

    // FIX: The 'return' keyword ensures the body is not empty
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}