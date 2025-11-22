import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [
  ],
  providers: [DatabaseService],
  exports: [DatabaseService], // Exports DatabaseService for other modules to use
})
export class DatabaseModule {} // ✅ This "export" keyword fixes your error