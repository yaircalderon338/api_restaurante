const express = require('express')
const router = express.Router()
const client = require('../db')

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_staff')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  const { username, password, status, role } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_staff (username, password, status, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, status, role]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
