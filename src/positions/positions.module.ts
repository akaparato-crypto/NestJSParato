import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { DatabaseModule } from '../database/database.module'; // Import the module

@Module({
  imports: [DatabaseModule], // <--- Import DatabaseModule here
  controllers: [PositionsController],
  providers: [PositionsService], // <--- Do NOT list DatabaseService here
})
export class PositionsModule {}