import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Pool;

  async onModuleInit() {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // <--- This reads from .env
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log('Database connected!');
  }

  async onModuleDestroy() {
    if (this.connection) {
      await this.connection.end();
    }
  }

  // Generic query runner
  async query(sql: string, params?: any[]) {
    const [results] = await this.connection.execute(sql, params);
    return results;
  }
}