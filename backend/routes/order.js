const express = require('express')
const router = express.Router()
const client = require('../db')

// GET all
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_order')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST new
router.post('/', async (req, res) => {
  const { status, total, order_date } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_order (status, total, order_date) VALUES ($1, $2, $3) RETURNING *',
      [status, total, order_date]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
