import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
  res.send('🚀 DVSYS API 2025 – FUNCIONANDO!');
});

app.post('/clientes', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const result = await pool.query(
      'INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *',
      [nombre, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API viva en puerto ${PORT}`);
});