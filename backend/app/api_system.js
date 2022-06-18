const express = require('express')
const router = express.Router()
// const P2pServer = require('./p2p-server')
// const constants = require('../config/constant')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Node = require('../models/node')
const Blockchain = require('../models/blockchain')
const net = require('net')
const os = require('os')
const osu = require('node-os-utils')
// const disk = require('diskusage')
const checkDiskSpace = require('check-disk-space').default

router.get('/test', async (req, res) => {
  const activeNode = await Node.findAll()

  if (activeNode) {
    res.status(200).json({
      status: 'ok',
      result: activeNode,
    })
  } else {
    res.status(500).json({
      status: 'nok',
    })
  }
})

//  @route                  GET  /api/v2/system/node
//  @desc                   Get all node
//  @access                 Private
router.get('/node', JwtMiddleware.checkToken, async (req, res) => {
  const activeNode = await Node.findAll()

  if (activeNode) {
    res.status(200).json({
      status: 'ok',
      result: activeNode,
    })
  } else {
    res.status(500).json({
      status: 'nok',
    })
  }
})

//  @route                  GET  /api/v2/system/info
//  @desc                   Get mock info
//  @access                 Private

router.get('/info', JwtMiddleware.checkToken, async (req, res) => {
  let all_nodes = await Node.count()
  let active_nodes = 0
  let blockCount = await Blockchain.count()

  let users = await Blockchain.count({
    distinct: 'true',
    col: 'blockchains.user',
  })

  const activeNode = await Node.findAll()

  // console.log('promiseSocketStream: ', promiseSocket.stream)

  if (activeNode) {
    var n = 0
    activeNode.map((node) => {
      var { server_ip, http_port, p2p_port } = node

      console.log(
        `Server IP: ${server_ip} Http Port: ${http_port} P2P Port: ${p2p_port}`,
      )

      var nodeSrv = net.connect({ host: server_ip, port: http_port }, () => {
        console.log(`Connected to server! ${server_ip}:${http_port}`)
        n++
        console.log('n: ', n)
      })

      nodeSrv.on('error', function (error) {
        console.log('what is this error', error.toString())
      })
    })
  } else {
    res.status(500).json({
      status: 'nok',
      message: 'Node not available',
    })
  }

  setTimeout(() => {
    active_nodes = n
    console.log('active_nodes', n)
    res.json({
      blockCount,
      nodes: all_nodes,
      active: active_nodes,
      users,
    })
  }, 100)
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

//  @route                  GET  /api/v2/system/os
//  @desc                   Get os info
//  @access                 public
router.get('/os', async (req, res) => {
  var cpu = osu.cpu
  var mem = osu.mem

  var cpuInfo = cpu.average()
  var memInfo = await mem.info()

  // let path = os.platform() === 'win32' ? 'c:' : '/'

  // let diskInfo = disk.checkSync(path)

  let diskInfo = await checkDiskSpace('C:/')

  if (memInfo && diskInfo) {
    res.status(200).json({
      cpuInfo,
      memInfo,
      diskInfo,
      // diskFree: diskInfo.available / 1000000000,
      // diskTotal: diskInfo.total / 1000000000,
      // diskUsed: diskInfo.total / 1000000000 - diskInfo.available / 1000000000,
    })
  }
})

module.exports = router
