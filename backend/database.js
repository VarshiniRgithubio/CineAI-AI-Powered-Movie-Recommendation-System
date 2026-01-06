import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'recommendations.db');
let db;

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Create table if it doesn't exist
      db.run(
        `CREATE TABLE IF NOT EXISTS recommendations (
          id TEXT PRIMARY KEY,
          user_input TEXT NOT NULL,
          recommended_movies TEXT NOT NULL,
          timestamp TEXT NOT NULL
        )`,
        (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Database initialized successfully');
            resolve();
          }
        }
      );
    });
  });
};

export const saveRecommendation = (id, userInput, recommendedMovies, timestamp) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO recommendations (id, user_input, recommended_movies, timestamp)
       VALUES (?, ?, ?, ?)`,
      [id, userInput, recommendedMovies, timestamp],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, userInput, recommendedMovies, timestamp });
        }
      }
    );
  });
};

export const getAllRecommendations = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM recommendations ORDER BY timestamp DESC LIMIT 50`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const data = rows.map((row) => ({
            id: row.id,
            userInput: row.user_input,
            recommendedMovies: JSON.parse(row.recommended_movies),
            timestamp: row.timestamp
          }));
          resolve(data);
        }
      }
    );
  });
};

export const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
