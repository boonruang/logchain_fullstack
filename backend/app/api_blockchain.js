const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Blockchain = require('../blockchain')
const blockchain = require('../models/blockchain')
const user = require('../models/user')
const constants = require('../config/constant')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

// const bc = new Blockchain()

//  @route                  GET  /api/v2/blockchain/blocks
//  @desc                   Get blockchain all blocks
//  @access                 Private
router.get('/blocks', JwtMiddleware.checkToken, async (req, res) => {
  p2pServer.syncChains()
  res.json(bc.chain)
})

//  @route                  GET  /api/v2/blockchain/blocks/:id
//  @desc                   Get Block by Id
//  @access                 Private
router.get('/blocks/:id', JwtMiddleware.checkToken, async (req, res) => {
  // let result = await blockchain.findOne({ where: { timestamp: req.params.id } })
  var result = bc.chain.find((item) => item.timestamp == req.params.id)
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
    const block = bc.addBlock(req.body)
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
      Error: error.toString(),
    })
  }
})

//  @route                  POST  /api/v2/blockchain/forcesync
//  @desc                   P2p forcesyncing blockchain
//  @access                 Private
router.get('/forcesync', JwtMiddleware.checkToken, async (req, res) => {
  p2pServer.syncChains()
  res.json(bc.chain)
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

//  @route                  GET  /api/v2/blockchain/form8
//  @desc                   list form8
//  @access                 Private
router.get('/form/:form/:year', async (req, res) => {
  let form = req.params.form
  let year = req.params.year

  switch (form) {
    case 'form8':
      var queryForm = '8'
      break
    case 'form9':
      var queryForm = '9'
      break
    default:
      console.log(`Sorry, we are out of ${form}.`)
  }

  console.log(`form: ${queryForm} year: ${year}`)
  try {
    const blockchainList = await blockchain.findAll({
      attributes: [
        'user',
        'action',
        'actiondate',
        // [Sequelize.fn('COUNT', Sequelize.col('user')), 'total_user'],
        // [ Sequelize.fn('extract(year)', Sequelize.col('created_at')), 'data']
        [
          Sequelize.fn(
            'strftime',
            // '%Y%m',
            '%Y-%m',
            Sequelize.col('actiondate'),
          ),
          'data',
        ],
      ],
      group: ['user'],
      where: {
        action: {
          [Op.like]: `%${queryForm}`,
        },
        actiondate: {
          [Op.like]: `%${year}%`,
        },
      },
    })
    if (blockchainList) {
      res.status(200).json({
        blockchainList,
      })
    } else {
      res.status(500).json({
        result: 'blockchain not available',
      })
    }
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      Error: error.toString(),
    })
  }
})

router.get('/formtest', async (req, res) => {
  // let form = req.params.form
  // let year = req.params.year

  // switch (form) {
  //   case 'form8':
  //     var queryForm = '8'
  //     break
  //   case 'form9':
  //     var queryForm = '9'
  //     break
  //   default:
  //     console.log(`Sorry, we are out of ${form}.`)
  // }

  // console.log(`form: ${queryForm} year: ${year}`)

  try {
    const blockchainList = await user.findAll({
      attributes: [
        'username',
        'status',
        [
          Sequelize.fn(
            'strftime',
            Sequelize.literal("'%Y%m'"),
            Sequelize.col('createdAt'),
          ),
          'data',
        ],
        // [Sequelize.fn('COUNT', Sequelize.col('user')), 'total_user'],
        // [ Sequelize.fn('extract(year)', Sequelize.col('created_at')), 'data']
        // [Sequelize.fn('YEAR', Sequelize.col('login')), 'data'],
      ],
      // group: ['user'],
      // where: {
      //   action: {
      //     [Op.like]: `%${queryForm}`,
      //   },
      //   login: {
      //     [Op.like]: `%${year}%`,
      //   },
      // },
    })
    if (blockchainList) {
      res.status(200).json({
        blockchainList,
      })
    } else {
      res.status(500).json({
        result: 'blockchain not available',
      })
    }
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      Error: error.toString(),
    })
  }
})
module.exports = router
