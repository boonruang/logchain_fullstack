const Transaction = require('../transaction')

class Miner {
  constructor(blockchain, transactionPool, p2pServer) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.p2pServer = p2pServer
  }

  mine() {
    // const validTransactions = this.transactionPool.validTransactions()

    //create a block consisting of the valid transactions
    const block = this.blockchain.addBlock(validTransactions)
    //synchronize thie chains in the peer-to-peer server
    this.p2pServer.syncChains()
    //clear the transaction poo;
    this.transactionPool.clear()
    //broadcast to every miner to clear their transaction pools
    this.p2pServer.broadcastClearTransactions()

    return block
  }
}

module.exports = Miner
