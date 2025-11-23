import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// 1. Import the module file here
import { PositionsModule } from './positions/positions.module'; 

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    PositionsModule // 2. Add the class name here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}