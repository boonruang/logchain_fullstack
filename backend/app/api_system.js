const express = require('express')
const router = express.Router()
const P2pServer = require('./p2p-server')
const constants = require('../constant')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Node = require('../models/node')

var net = require('net')
blockSrv = [
  { port: 5001, host: '192.168.0.150' },
  { port: 5002, host: '192.168.0.151' },
]

//  @route                  GET  /api/v2/system/info
//  @desc                   Get mock info
//  @access                 Private

router.get('/info', JwtMiddleware.checkToken, async (req, res) => {
  let all_nodes = 3
  let active_nodes = 3
  let users = 12
  res.json({ nodes: all_nodes, active: active_nodes, users })
})

//  @route                  GET  /api/v2/blockchain/info/:id
//  @desc                   Get system by Id
//  @access                 Private
router.get('/info/:id', JwtMiddleware.checkToken, async (req, res) => {
  let result = await Node.findOne({ where: { id: req.params.id } })
  if (result) {
    res.json(result)
  } else {
    res.json({ message: 'Id not found' })
  }
})

//  @route                  GET  /api/v2/blockchain/info/:id
//  @desc                   Get system by Id
//  @access                 Private
router.get('/ping', JwtMiddleware.checkToken, async (req, res) => {
  const { host, port } = req.body
  var client = net.connect({ host, port }, function () {
    console.log(`Connected to server! ${host}:${port}`)
    res.status(200).json({
      message: 'ok',
      result: `Connected to server!! ${host}:${port}`,
    })
  })

  // client.error('error', function (error) {
  //   console.log('what is this error', error.toString())
  //   client.close()
  // })

  client.on('error', function (error) {
    console.log('what is this error', error.toString())
    res.status(500).json({
      message: 'nok',
      Error: error,
    })
  })

  client.on('data', function (data) {
    console.log('what is this data', data.toString())
    client.end()
  })

  client.on('end', function () {
    console.log('disconnected from server')
  })
})

//  @route                  POST  /api/v2/system/info
//  @desc                   Create system info
//  @access                 Private
router.post('/info', JwtMiddleware.checkToken, async (req, res) => {
  const { nodename, isActive, server_ip, http_port, p2p_port } = req.body

  try {
    const nodes = await Node.create({
      nodename,
      isActive,
      server_ip,
      http_port,
      p2p_port,
    })

    if (nodes) {
      res.status(200).json({
        message: 'system created successfully',
        data: nodes,
      })
    } else {
      res.status(400).json({
        message: 'system can not be updated',
        data: nodes,
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

//  @route                  GET  /api/v2/system/sysinfo
//  @desc                   Get system info
//  @access                 Private
router.get('/sysinfo', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const system = await Node.findAll({
      where: {
        isActive: 1,
      },
    })

    if (system) {
      res.status(200).json({
        message: 'ok',
        data: system,
      })
    } else {
      res.status(400).json({
        message: 'no system info',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

module.exports = router