const express = require('express')
const router = express.Router()
const client = require('../db')

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_menuitem')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET menu item by id
router.get('/:id', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_menuitem WHERE itemid = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST new menu item
router.post('/', async (req, res) => {
  const { menuid, menuitemname, price } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_menuitem (menuid, menuitemname, price) VALUES ($1, $2, $3) RETURNING *',
      [menuid, menuitemname, price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update menu item
router.put('/:id', async (req, res) => {
  const { menuid, menuitemname, price } = req.body
  try {
    const result = await client.query(
      'UPDATE tbl_menuitem SET menuid = $1, menuitemname = $2, price = $3 WHERE itemid = $4 RETURNING *',
      [menuid, menuitemname, price, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE menu item
router.delete('/:id', async (req, res) => {
  try {
    const result = await client.query('DELETE FROM tbl_menuitem WHERE itemid = $1 RETURNING *', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ message: 'Menu item no encontrado' })
    res.json({ message: 'Menu item eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
