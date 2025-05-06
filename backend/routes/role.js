const express = require('express');
const router = express.Router();
const client = require('../db');

// Ruta GET para obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_role');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta GET para obtener un rol específico por su nombre (insensible a mayúsculas)
router.get('/:role', async (req, res) => {
  const { role } = req.params;  // Obtiene el parámetro `role` desde la URL
  try {
    const result = await client.query(
      'SELECT * FROM tbl_role WHERE LOWER(role) = LOWER($1)',
      [role]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Rol "${role}" no encontrado` });
    }

    res.json(result.rows[0]);  // Devuelve el rol encontrado
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta POST para agregar un nuevo rol
router.post('/', async (req, res) => {
  const { role } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO tbl_role (role) VALUES ($1) RETURNING *',
      [role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta PUT para actualizar un rol por su nombre
router.put('/:role', async (req, res) => {
  const { role } = req.params;
  const { newRole } = req.body;  // Aquí asumimos que pasas el nuevo rol en el cuerpo de la solicitud
  try {
    const result = await client.query(
      'UPDATE tbl_role SET role = $1 WHERE LOWER(role) = LOWER($2) RETURNING *',
      [newRole, role]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Rol "${role}" no encontrado para actualizar` });
    }

    res.json(result.rows[0]);  // Devuelve el rol actualizado
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta DELETE para eliminar un rol por su nombre
router.delete('/:role', async (req, res) => {
  const { role } = req.params;
  try {
    const result = await client.query(
      'DELETE FROM tbl_role WHERE LOWER(role) = LOWER($1) RETURNING *',
      [role]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Rol "${role}" no encontrado para eliminar` });
    }

    res.json({ message: `Rol "${role}" eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
