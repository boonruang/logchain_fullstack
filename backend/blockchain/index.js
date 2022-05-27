const Block = require('./block')
const blockchain = require('../models/blockchain')
let nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()

class Blockchain {
  constructor() {
    // this.chain = [Block.genesis()]
    // console.log('getData in Blockchain: ', Block.getData())
    NODE_NAME == 'NODE1'
      ? (this.chain = Block.getData())
      : (this.chain = [Block.genesis()])
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
    this.chain.push(block)
    // this.writeDB(this.chain)
    return block
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      // console.log('chain[0]: ', chain[0])
      // console.log('Block Genesis ', JSON.stringify(Block.genesis()))
      return false
    }
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]
      if (
        block.lasthash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false
      }
    }
    return true
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('newChain.length: ', newChain.length)
      console.log('this.chain.length: ', this.chain.length)
      console.log('newChain: ', newChain)
      console.log('this.chain: ', this.chain)
      console.log('Recieved chain is not longer than the current chain.')
      return
    } else if (!this.isValidChain(newChain)) {
      console.log('chain[0]: ', JSON.stringify(this.chain[0]))
      console.log('Block Genesis ', JSON.stringify(Block.genesis()))
      console.log('newChain isValid: ', newChain)
      for (let i = 1; i < newChain.length; i++) {
        const block = newChain[i]
        const lastBlock = newChain[i - 1]
        console.log('NO:', i)
        console.log('block.lasthash: ', block.lasthash)
        console.log('lastBlock.hash: ', lastBlock.hash)
        console.log('block.hash: ', block.hash)
        console.log('Block.blockHash(block): ', Block.blockHash(block))
      }
      // console.log('block.lastHash : ', block.lastHash)
      // console.log('lastBlock.hash : ', lastBlock.hash)
      // console.log('block.hash : ', block.hash)
      // console.log('Block.blockHash(block) : ', Block.blockHash(block))
      console.log('The received chain is not valid.')
      return
    }

    console.log('newChain.length2: ', newChain.length)
    console.log('this.chain.length2: ', this.chain.length)

    console.log('Replacing blockchain with the new chain')
    this.chain = newChain
    // this.writeDB(this.chain)
  }

  async writeDB(chain) {
    console.log('chain data in writeDB', chain)
    try {
      chain.map((item) => {
        blockchain
          .create(item)
          .then((result) => {
            console.log('write data to DB successful: ', result)
          })
          .catch((error) => {
            console.log('write data to DB failed: ', error)
          })
      })
    } catch (error) {
      console.log('write data to DB error: ', error)
    }
  }
}

module.exports = Blockchain
