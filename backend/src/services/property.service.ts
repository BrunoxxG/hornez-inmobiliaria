import pool from '../config/db';
import { Property } from '../models/property.model';

class PropertyService {
  async createProperty(data: Property): Promise<Property> {
    const { title, description, price, location, type, images } = data;
    const client = await pool.connect();
    try {
      const res = await client.query(
        `INSERT INTO properties (title, description, price, location, type, images)
         VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [title, description, price, location, type, images]
      );
      return res.rows[0];
    } finally {
      client.release();
    }
  }

  async getPropertyById(id: number): Promise<Property | null> {
    const res = await pool.query('SELECT * FROM properties WHERE id=$1', [id]);
    return res.rows[0] || null;
  }

  async getAllProperties(): Promise<Property[]> {
    const res = await pool.query('SELECT * FROM properties ORDER BY id DESC');
    return res.rows;
  }

  async updateProperty(id: number, data: Partial<Property>): Promise<Property | null> {
    const fields = Object.keys(data);
    const values = Object.values(data);
    if (fields.length === 0) return this.getPropertyById(id);

    const setQuery = fields.map((f, i) => `${f}=$${i + 1}`).join(',');
    const res = await pool.query(
      `UPDATE properties SET ${setQuery} WHERE id=$${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return res.rows[0] || null;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const res = await pool.query('DELETE FROM properties WHERE id=$1', [id]);
    return res.rowCount > 0;
  }
}

export default new PropertyService();
