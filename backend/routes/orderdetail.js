const express = require('express')
const router = express.Router()
const client = require('../db')

// GET all
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM tbl_orderdetail')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one by orderDetailID
router.get('/:orderDetailID', async (req, res) => {
  const { orderDetailID } = req.params
  try {
    const result = await client.query('SELECT * FROM tbl_orderdetail WHERE orderDetailID = $1', [orderDetailID])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Detalle de orden no encontrado' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST new
router.post('/', async (req, res) => {
  const { orderID, itemID, quantity } = req.body
  try {
    const result = await client.query(
      'INSERT INTO tbl_orderdetail (orderID, itemID, quantity) VALUES ($1, $2, $3) RETURNING *',
      [orderID, itemID, quantity]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update by orderDetailID
router.put('/:orderDetailID', async (req, res) => {
  const { orderDetailID } = req.params
  const { orderID, itemID, quantity } = req.body
  try {
    const result = await client.query(
      'UPDATE tbl_orderdetail SET orderID = $1, itemID = $2, quantity = $3 WHERE orderDetailID = $4 RETURNING *',
      [orderID, itemID, quantity, orderDetailID]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Detalle de orden no encontrado para actualizar' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE by orderDetailID
router.delete('/:orderDetailID', async (req, res) => {
  const { orderDetailID } = req.params
  try {
    const result = await client.query('DELETE FROM tbl_orderdetail WHERE orderDetailID = $1 RETURNING *', [orderDetailID])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Detalle de orden no encontrado para eliminar' })
    }
    res.status(200).json({ message: 'Detalle de orden eliminado correctamente', deletedOrderDetail: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

