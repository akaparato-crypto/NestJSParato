import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface CreatePositionDto {
  position_code: string;
  position_name: string;
}

export interface UpdatePositionDto {
  position_code?: string;
  position_name?: string;
}

@Injectable()
export class PositionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.query('SELECT * FROM positions');
  }

  async create(data: CreatePositionDto) {
    const query = 'INSERT INTO positions (position_code, position_name) VALUES (?, ?)';
    
    // Use 'any' type here to access .insertId on the result
    const result: any = await this.db.query(query, [data.position_code, data.position_name]);

    // ✅ Return the real ID
    return {
      id: result.insertId, 
      ...data,
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