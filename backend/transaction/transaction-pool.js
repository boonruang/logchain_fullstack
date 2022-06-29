const Block = require('../blockchain/block')
const nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()

class TranactionPool {
  constructor() {
    this.transactions = []
  }

  addTransaction(chain, transaction) {
    if (chain) {
      var blockObj = chain[chain.length - 1]
    } else {
      var blockObj = Block.genesis()
    }

    // console.log('addTransaction lastBlock : ', blockObj)
    // console.log('addTransaction tricked : ', transaction)
    const block = Block.mineBlock(blockObj, transaction)

    chain.push(block)
    p2pServer.syncChains()

    // compare with another node
    // push to blockchain

    console.log('Calculated on NODE : ', NODE_NAME)
    console.log('add header to block : ', block)
    // console.log('chain after add header : ', chain)

    // this.transactions = chain
    return
  }

  validTransactions() {
    //
  }

  clear() {
    this.transactions = []
  }
}

module.exports = TranactionPool
