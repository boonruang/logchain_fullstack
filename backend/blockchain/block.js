const { DIFFICULTY, MINE_RATE } = require('../config/bc_config')
const ChainUtil = require('../utils/chain-util')
let nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()

class Block {
  constructor(
    timestamp,
    hash,
    lasthash,
    data,
    confirmTimestamp,
    confirmNode,
    minetime,
    nonce,
    difficulty,
  ) {
    this.timestamp = timestamp
    this.hash = hash
    this.lasthash = lasthash
    this.data = data
    this.confirmTimestamp = confirmTimestamp
    this.confirmNode = confirmNode || NODE_NAME
    this.minetime = minetime
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString() {
    return `Block -
        timestamp : ${this.timestamp},
        Hash : ${this.hash.substring(0, 10)},
        Last Hash : ${this.lasthash.substring(0, 10)},
        confirmed Timestamp : ${this.confirmTimestamp},
        confirmed Node : ${this.confirmNode},
        Mine Time : ${this.minetime},
        Nonce : ${this.nonce},
        Difficulty : ${this.difficulty}
        Data : ${this.data},
        `
  }

  static genesis() {
    return new this(
      1609466949000,
      'F1r5t-h45h',
      '-----------',
      [],
      1609466949000,
      '-----------',
      0,
      0,
      DIFFICULTY,
    )
  }

  static mineBlock(lastBlock, data) {
    let hash
    let timestamp = Date.now()
    let confirmTimestamp
    let confirmNode = NODE_NAME
    let lasthash = lastBlock.hash
    let { difficulty } = lastBlock
    let minetime = 0
    let nonce = 0

    do {
      nonce = Math.floor(Math.random() * 100000)
      confirmTimestamp = Date.now()
      minetime = confirmTimestamp - timestamp
      difficulty = Block.adjustDifficulty(lastBlock, confirmTimestamp)
      hash = Block.hash(
        timestamp,
        lasthash,
        data,
        confirmTimestamp,
        confirmNode,
        minetime,
        nonce,
        difficulty,
      )
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    // console.log(
    //   `>>>
    //   timestamp: ${timestamp}
    //   hash: ${hash}
    //   Last Hash : ${lasthash}
    //   confirmTimestamp: ${confirmTimestamp}
    //   confirmNode: ${confirmNode}
    //   minetime: ${minetime}
    //   nonce: ${nonce}
    //   difficulty: ${difficulty}
    //   <<<`,
    // )

    return new this(
      timestamp,
      hash,
      lasthash,
      data,
      confirmTimestamp,
      confirmNode,
      minetime,
      nonce,
      difficulty,
    )
  }

  static hash(
    timestamp,
    lasthash,
    data,
    confirmTimestamp,
    confirmNode,
    minetime,
    nonce,
    difficulty,
  ) {
    return ChainUtil.hash(
      `${timestamp}${lasthash}${data}${confirmTimestamp}${confirmNode}${minetime}${nonce}${difficulty}`,
    ).toString()
  }

  static blockHash(block) {
    const {
      timestamp,
      lasthash,
      data,
      confirmTimestamp,
      confirmNode,
      minetime,
      nonce,
      difficulty,
    } = block
    console.log('block in blockHash function: ', block)
    return Block.hash(
      timestamp,
      lasthash,
      data,
      confirmTimestamp,
      confirmNode,
      minetime,
      nonce,
      difficulty,
    )
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1

    if (difficulty == 0) difficulty = 1
    return difficulty
  }
}

module.exports = Block
