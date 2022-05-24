const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Blockchain = require('../blockchain')
const blockchain = require('../models/blockchain')
const constants = require('../constant')
const JwtMiddleware = require('../config/Jwt-Middleware')

// const bc = new Blockchain()

//  @route                  GET  /api/v2/blockchain/blocks
//  @desc                   Get blockchain all blocks
//  @access                 Private
router.get('/blocks', JwtMiddleware.checkToken, async (req, res) => {
  res.json(bc.chain)
  // console.log('req header: ', req.headers)
  //   try {
  //     let result = await blockchain.findAll({
  //       order: Sequelize.literal('timestamp DESC'),
  //     })
  //     if (result) {
  //       res.status(500).json({
  //         result,
  //       })
  //     } else {
  //       res.status(500).json({
  //         result: 'Error',
  //       })
  //     }
  //   } catch (error) {
  //     console.log('read blocks error', error)
  //     res.status(500).json({
  //       error,
  //     })
  //   }
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
  try {
    const block = await bc.addBlock(req.body)
    if (block) {
      console.log(`New block added: ${block.toString()}`)
      p2pServer.syncChains()
      res.status(200).json({
        status: 'New block added',
        block,
      })
    } else {
      res.status(500).json({
        status: 'Add block failed',
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'Add block failed',
    })
  }
})

//  @route                  POST  /api/v2/blockchain/sync
//  @desc                   P2p Syncing blockchain
//  @access                 Private
router.get('/sync', JwtMiddleware.checkToken, async (req, res) => {
  try {
    // const blockchainFound = await blockchain.findAll()

    const blockchainFound = {
      chain: [
        {
          user: 'สมศรี แสนจันทร์',
          action: 'กรอกแบบฟอร์ม รง.8',
          api: '/api/form8',
          login: '2022-5-19 10:05:29.751',
          logout: '2022-5-19 10:25:29.751',
        },
        {
          user: 'สมศักดิ์ แสนจันทร์ศรี',
          action: 'กรอกแบบฟอร์ม รง.9',
          api: '/api/form8',
          login: '2022-5-19 12:05:29.751',
          logout: '2022-5-19 12:25:29.751',
        },
      ],
    }

    const p2pServer = new P2pServer(blockchainFound)

    if (blockchainFound) {
      // res.status(200).json(blockchainFound)
      p2pServer.syncNode(blockchainFound)
    } else {
      console.log('blockchain not syncing')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
