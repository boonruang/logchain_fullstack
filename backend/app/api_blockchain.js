const express = require('express')
const router = express.Router()
const P2pServer = require('./p2p-server')
const Sequelize = require('sequelize')
const Blockchain = require('../blockchain')
const blockchain = require('../models/blockchain')
const constants = require('../constant')
const JwtMiddleware = require('../config/Jwt-Middleware')

const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

//  @route                  GET  /api/v2/blockchain/blocks
//  @desc                   Get blockchain all blocks
//  @access                 Private
router.get('/blocks', JwtMiddleware.checkToken, async (req, res) => {
  let result = await blockchain.findAll({
    order: Sequelize.literal('timestamp DESC'),
  })
  res.json(result)
})

//  @route                  GET  /api/v2/blockchain/count
//  @desc                   Get blockchain recond count number
//  @access                 Private
router.get('/count', JwtMiddleware.checkToken, async (req, res) => {
  let result = await blockchain.count()
  res.json(result)
})

//  @route                  GET  /api/v2/blockchain/blocks/:id
//  @desc                   Get Block by Id
//  @access                 Private
router.get('/blocks/:id', JwtMiddleware.checkToken, async (req, res) => {
  let result = await blockchain.findOne({ where: { timestamp: req.params.id } })
  if (result) {
    res.json(result)
  } else {
    res.json({ message: 'Id not found' })
  }
})

//  @route                  POST  /api/v2/blockchain/mine
//  @desc                   Add Block to blockchain
//  @access                 Private
router.post('/mine', JwtMiddleware.checkToken, async (req, res) => {
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
})

module.exports = router
