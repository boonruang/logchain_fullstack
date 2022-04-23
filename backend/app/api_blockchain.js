const express = require('express')
const router = express.Router()
const P2pServer = require('./p2p-server')
const Sequelize = require('sequelize')
const Blockchain = require('../blockchain')
const blockchain = require('../models/blockchain')
const constants = require('../constant')

const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

router.get('/blocks', async (req, res) => {
  let result = await blockchain.findAll({
    order: Sequelize.literal('timestamp DESC'),
  })
  res.json(result)
})

router.get('/count', async (req, res) => {
  let result = await blockchain.count()
  res.json(result)
})

// Get Block by Id
router.get('/blocks/:id', async (req, res) => {
  let result = await blockchain.findOne({ where: { timestamp: req.params.id } })
  if (result) {
    res.json(result)
  } else {
    res.json({ message: 'Id not found' })
  }
})

router.post('/mine', async (req, res) => {
  const block = bc.addBlock(req.body)

  // create table first
  blockchain.sync()

  const lastRecord = await blockchain.findOne({
    limit: 1,
    order: [['timestamp', 'DESC']],
  })

  if (lastRecord) {
    block.lasthash = lastRecord.hash
  }

  console.log(`New block added: ${block.toString()}`)

  p2pServer.syncChains()

  try {
    let result = await blockchain.create(block)
    res.json({ result: constants.kResultOk, message: result })
  } catch (error) {
    res.json({ result: constants.kResultNok, message: error })
  }

  // res.redirect('/blocks')
})

module.exports = router
