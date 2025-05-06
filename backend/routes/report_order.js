const express = require('express')
const router = express.Router()
const client = require('../db')

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_report_order')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  const { reportid, orderid } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_report_order (reportid, orderid) VALUES ($1, $2) RETURNING *',
      [reportid, orderid]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
