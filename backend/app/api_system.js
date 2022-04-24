const express = require('express')
const router = express.Router()
const P2pServer = require('./p2p-server')
const constants = require('../constant')
const JwtMiddleware = require('../config/Jwt-Middleware')

//  @route                  GET  /api/v2/system/info
//  @desc                   Get system info
//  @access                 Private
router.get('/info', JwtMiddleware.checkToken, async (req, res) => {
  let all_nodes = 3
  let active_nodes = 3
  let users = 12
  res.json({ nodes: all_nodes, active: active_nodes, users })
})

module.exports = router
