const express = require('express')
const router = express.Router()
const P2pServer = require('./p2p-server')
const constants = require('../constant')

router.get('/info', async (req, res) => {
  let all_nodes = 3
  let active_nodes = 3
  let users = 10
  res.json({ nodes: all_nodes, active: active_nodes, users })
})

module.exports = router
