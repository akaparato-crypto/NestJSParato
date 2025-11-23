import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // Optional: makes it available everywhere without importing
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // <--- CRITICAL: Allows PositionsModule to use it
})
export class DatabaseModule {}