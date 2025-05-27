const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const [result] = await db.execute(
        'INSERT INTO users (first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
        [userData.firstName, userData.lastName, userData.email, hashedPassword, userData.phone]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT id, first_name, last_name, email, phone, created_at, last_login FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateLastLogin(userId) {
    try {
      await db.execute(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [userId]
      );
    } catch (error) {
      throw error;
    }
  }

  static async createSession(userId, sessionToken, expiresAt, ipAddress, userAgent) {
    try {
      await db.execute(
        'INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)',
        [userId, sessionToken, ipAddress, userAgent, expiresAt]
      );
    } catch (error) {
      throw error;
    }
  }

  static async validateSession(sessionToken) {
    try {
      const [rows] = await db.execute(
        'SELECT us.*, u.email FROM user_sessions us JOIN users u ON us.user_id = u.id WHERE us.session_token = ? AND us.expires_at > CURRENT_TIMESTAMP',
        [sessionToken]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteSession(sessionToken) {
    try {
      await db.execute(
        'DELETE FROM user_sessions WHERE session_token = ?',
        [sessionToken]
      );
    } catch (error) {
      throw error;
    }
  }

  static async createPasswordResetToken(userId, token, expiresAt) {
    try {
      await db.execute(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt]
      );
    } catch (error) {
      throw error;
    }
  }

  static async validatePasswordResetToken(token) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > CURRENT_TIMESTAMP',
        [token]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(userId, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, userId]
      );
    } catch (error) {
      throw error;
    }
  }

  static async deletePasswordResetToken(token) {
    try {
      await db.execute(
        'DELETE FROM password_reset_tokens WHERE token = ?',
        [token]
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User; 