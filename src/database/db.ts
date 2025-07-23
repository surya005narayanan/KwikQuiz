import initSqlJs from 'sql.js';
import { User } from '../types';

class DatabaseManager {
  private db: any = null;
  private SQL: any = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Initialize sql.js
      this.SQL = await initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });

      // Try to load existing database from localStorage
      const savedDb = localStorage.getItem('kwikquiz_db');
      if (savedDb) {
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new this.SQL.Database(uint8Array);
      } else {
        this.db = new this.SQL.Database();
      }

      this.initializeDatabase();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private initializeDatabase() {
    // Create users table if it doesn't exist
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    this.db.run(createUsersTable);
    this.saveDatabase();
  }

  private saveDatabase() {
    // Save database to localStorage
    const data = this.db.export();
    const buffer = Array.from(data);
    localStorage.setItem('kwikquiz_db', JSON.stringify(buffer));
  }

  // Create a new user
  async createUser(user: Omit<User, 'id'> & { password: string }): Promise<User> {
    await this.initialize();
    
    const id = Date.now().toString();
    
    try {
      this.db.run(
        'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
        [id, user.username, user.email, user.password]
      );
      
      this.saveDatabase();
      
      return {
        id,
        username: user.username,
        email: user.email
      };
    } catch (error: any) {
      if (error.message.includes('UNIQUE constraint failed')) {
        if (error.message.includes('username')) {
          throw new Error('Username already exists');
        } else if (error.message.includes('email')) {
          throw new Error('Email already exists');
        }
      }
      throw new Error('Failed to create user');
    }
  }

  // Find user by email and password
  async findUserByCredentials(email: string, password: string): Promise<User | null> {
    await this.initialize();
    
    const stmt = this.db.prepare('SELECT id, username, email FROM users WHERE email = ? AND password = ?');
    const result = stmt.getAsObject([email, password]);
    
    if (Object.keys(result).length === 0) {
      return null;
    }
    
    return {
      id: result.id as string,
      username: result.username as string,
      email: result.email as string
    };
  }

  // Find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    await this.initialize();
    
    const stmt = this.db.prepare('SELECT id, username, email FROM users WHERE email = ?');
    const result = stmt.getAsObject([email]);
    
    if (Object.keys(result).length === 0) {
      return null;
    }
    
    return {
      id: result.id as string,
      username: result.username as string,
      email: result.email as string
    };
  }

  // Find user by username
  async findUserByUsername(username: string): Promise<User | null> {
    await this.initialize();
    
    const stmt = this.db.prepare('SELECT id, username, email FROM users WHERE username = ?');
    const result = stmt.getAsObject([username]);
    
    if (Object.keys(result).length === 0) {
      return null;
    }
    
    return {
      id: result.id as string,
      username: result.username as string,
      email: result.email as string
    };
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

// Create singleton instance
export const db = new DatabaseManager();