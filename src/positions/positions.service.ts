import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
// Import the DTOs from the controller so we don't duplicate code
import { CreatePositionDto, UpdatePositionDto } from './positions.controller';

@Injectable()
export class PositionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.query('SELECT * FROM positions');
  }

  // UPDATED: Now accepts userId as the second argument
  async create(data: CreatePositionDto, userId: number) {
    // UPDATED: Query now includes 'user_id'
    const query = 'INSERT INTO positions (position_code, position_name, user_id) VALUES (?, ?, ?)';
    
    // UPDATED: Passing userId to the database. 
    // We use '?? 1' here as a double-safety check to ensure it's never undefined.
    const safeUserId = userId ?? 1;

    const result: any = await this.db.query(query, [
      data.position_code, 
      data.position_name, 
      safeUserId
    ]);

    return {
      id: result.insertId, 
      ...data,
      user_id: safeUserId
    };
  }

  async update(id: number, data: UpdatePositionDto) {
    const query = `UPDATE positions SET position_code = ?, position_name = ? WHERE id = ?`;
    await this.db.query(query, [data.position_code, data.position_name, id]);
    return { id, ...data };
  }

  async remove(id: number) {
    await this.db.query('DELETE FROM positions WHERE id = ?', [id]);
    return { message: 'Deleted successfully', id };
  }
}