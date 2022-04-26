const express = require('express')
const P2pServer = require('./p2p-server')
const cors = require('cors')
const Blockchain = require('../blockchain')
const bc = new Blockchain()

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()

const p2pServer = new P2pServer(bc)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/v2/system', require('./api_system'))
app.use('/api/v2/blockchain', require('./api_blockchain'))
app.use('/api/v2/user', require('./api_user'))
app.use('/api/v2/auth', require('./api_auth'))

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen()
