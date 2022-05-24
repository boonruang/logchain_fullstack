const express = require('express')
const P2pServer = require('./p2p-server')
const cors = require('cors')
const Blockchain = require('../blockchain')
const BlockSystem = require('./blocksystem')
const SERVER_IP = process.env.SERVER_IP || '192.168.0.150'
const HTTP_PORT = process.env.HTTP_PORT || 3001
const P2P_PORT = process.env.P2P_PORT || 5001
let nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()
const app = express()
app.use(cors())
app.use(express.json())

global.bc = new Blockchain()
global.p2pServer = new P2pServer(bc)

app.use('/api/v2/system', require('./api_system'))
app.use('/api/v2/blockchain', require('./api_blockchain'))
app.use('/api/v2/user', require('./api_user'))
app.use('/api/v2/auth', require('./api_auth'))

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))

blocksystem = new BlockSystem(NODE_NAME, 1, SERVER_IP, HTTP_PORT, P2P_PORT)

blocksystem.monitoring()

console.log('BlockSystem : ', blocksystem)
p2pServer.syncChains()
p2pServer.listen()
