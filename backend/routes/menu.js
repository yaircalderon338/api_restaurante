const express = require('express')
const router = express.Router()
const client = require('../db')

// GET all menus
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_menu')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET menu by id
router.get('/:id', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_menu WHERE menuid = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST new menu
router.post('/', async (req, res) => {
  const { menuname } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_menu (menuname) VALUES ($1) RETURNING *',
      [menuname]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update menu
router.put('/:id', async (req, res) => {
  const { menuname } = req.body
  try {
    const result = await client.query(
      'UPDATE tbl_menu SET menuname = $1 WHERE menuid = $2 RETURNING *',
      [menuname, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE menu
router.delete('/:id', async (req, res) => {
  try {
    const result = await client.query('DELETE FROM tbl_menu WHERE menuid = $1 RETURNING *', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu no encontrado' })
    res.json({ message: 'Menu eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
