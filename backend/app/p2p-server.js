const Websocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const Block = require('../blockchain/block')
let nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT })
    server.on('connection', (socket) => this.connectSocket(socket))

    console.log('peers in listen: ', peers)

    this.connectToPeers()

    console.log(`Listening for peer-to-peer on port ${P2P_PORT}`)
  }

  connectToPeers() {
    peers.forEach((peer) => {
      console.log('peers in connToPeers: ', peer)
      const socket = new Websocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')
    console.log('This.blockchain in conSocket: ', this.blockchain)
    // console.log('Socket: ', socket)
    // console.log('This.socket: ', this.sockets)
    // this.messageHandler(socket)
    NODE_NAME == 'NODE4'
      ? this.messageHandlerFake(socket)
      : this.messageHandler(socket)
    this.sendChain(socket)
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message)
      console.log('Data msg in msgHandler:', data)
      this.blockchain.replaceChain(data)
    })
  }

  messageHandlerFake(socket) {
    socket.on('message', (message) => {
      const data = Block.getFakeData()
      console.log('Data msg in messageHandlerFak:', data)
      this.blockchain.chain = data
      this.sendChain(socket)
    })
  }

  sendChain(socket) {
    console.log('In sendChain: ', JSON.stringify(this.blockchain.chain))
    socket.send(JSON.stringify(this.blockchain.chain))
  }

  syncChains() {
    console.log('peers: ', peers)
    console.log('this.blockchain.chain in syncChain: ', this.blockchain.chain)
    this.sockets.forEach((socket) => this.sendChain(socket))
  }
}

module.exports = P2pServer
