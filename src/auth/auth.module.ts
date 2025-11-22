import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import the module, not the service
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // <--- Connects to the shared UsersModule
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secretKey', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy], // Note: UsersService is NOT listed here
})
export class AuthModule {}