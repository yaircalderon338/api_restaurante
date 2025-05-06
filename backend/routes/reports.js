const express = require('express');
const router = express.Router();
const client = require('../db');

// GET all reports
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_reports');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET report by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM tbl_reports WHERE reportID = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new report
router.post('/', async (req, res) => {
  const { report_date, report_data, adminid } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO tbl_reports (report_date, report_data, adminid) VALUES ($1, $2, $3) RETURNING *',
      [report_date, report_data, adminid]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
