const express = require('express')
const router = express.Router()
const client = require('../db')

router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_reports')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  const { report_date, report_data, adminid } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_reports (report_date, report_data, adminid) VALUES ($1, $2, $3) RETURNING *',
      [report_date, report_data, adminid]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
