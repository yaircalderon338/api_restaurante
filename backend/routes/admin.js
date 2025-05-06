const express = require('express');
const router = express.Router();
const client = require('../db');

// GET all
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_admin');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM tbl_admin WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO tbl_admin (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const result = await client.query(
      'UPDATE tbl_admin SET username = $1, password = $2 WHERE id = $3 RETURNING *',
      [username, password, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM tbl_admin WHERE id = $1', [id]);
    res.json({ message: 'Admin eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
