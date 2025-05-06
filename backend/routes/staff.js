const express = require('express');
const router = express.Router();
const client = require('../db');

// Obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_staff');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un empleado por staffid
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM tbl_staff WHERE staffid = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
  const { username, password, status, role } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO tbl_staff (username, password, status, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, status, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un empleado por staffid
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, status, role } = req.body;
  try {
    const result = await client.query(
      'UPDATE tbl_staff SET username = $1, password = $2, status = $3, role = $4 WHERE staffid = $5 RETURNING *',
      [username, password, status, role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un empleado por staffid
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      'DELETE FROM tbl_staff WHERE staffid = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

