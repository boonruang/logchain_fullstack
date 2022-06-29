const Websocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS',
}

class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
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
      this.messageHandler(socket)
    })
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')
    console.log('This.blockchain in conSocket: ', this.blockchain)
    // console.log('Socket: ', socket)
    // console.log('This.socket: ', this.sockets)

    // this.messageHandler(socket)
    this.sendChain(socket)
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message)
      // console.log('msgHandler data.chain: ', data.chain)
      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain)
          console.log('msg type chain in msgHandler: ', data.chain)
          break
        case MESSAGE_TYPES.transaction:
          this.transactionPool.addTransaction(
            this.blockchain.chain,
            data.transaction,
          )
          console.log('msg type transaction in msgHandler: ', data.transaction)
          break
        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear()
          break
      }
      // console.log('Data msg in msgHandler:', data)
      // this.blockchain.replaceChain(data)
    })
  }

  sendChain(socket) {
    // console.log('In sendChain: ', this.blockchain.chain)
    // socket.send(JSON.stringify(this.blockchain.chain))
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain,
      }),
    )
  }

  sendTransaction(socket, transaction) {
    // socket.send(JSON.stringify(transaction))
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction: transaction,
      }),
    )
  }

  syncChains() {
    console.log('peers: ', peers)
    console.log('this.blockchain.chain in syncChains: ', this.blockchain.chain)
    this.sockets.forEach((socket) => this.sendChain(socket))
  }

  broadcastTransaction(transaction) {
    console.log('broadcastTransaction: ', transaction)
    this.sockets.forEach((socket) => this.sendTransaction(socket, transaction))
  }

  broadcastClearTransactions() {
    this.sockets.forEach((socket) =>
      socket.send(
        JSON.stringify({
          type: MESSAGE_TYPES.clear_transactions,
        }),
      ),
    )
  }
}

module.exports = P2pServer
