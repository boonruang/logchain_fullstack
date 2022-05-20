const Websocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const Node = require('../models/node')
const Blockchain = require('../models/blockchain')

class P2pSync {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
    this.chain.push(block)
    return block
  }

  syncing() {
    const server = new Websocket.Server({ port: P2P_PORT })
    server.on('connection', (socket) => this.connectSocket(socket))

    console.log('peers: ', peers)

    this.connectToPeers()

    console.log(`Listening for peer-to-peer on port ${P2P_PORT}`)
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new Websocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')
    console.log('This.blockchain: ', this.blockchain)
    // console.log('Socket: ', socket)
    // console.log('This.socket: ', this.sockets)
    this.messageHandler(socket)
    this.sendChain(socket)
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message)
      console.log('Data:', data)
      this.blockchain.replaceChain(data)
    })
  }

  sendChain(socket) {
    // console.log('In sendChain: ', JSON.stringify(this.blockchain.chain))
    socket.send(JSON.stringify(this.blockchain.chain))
  }

  syncChains() {
    this.sockets.forEach((socket) => this.sendChain(socket))
  }
}

module.exports = P2pSync
