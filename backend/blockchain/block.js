const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY, MINE_RATE } = require('../config/bc_config')

class Block {
  constructor(
    timestamp,
    hash,
    lasthash,
    user,
    action,
    actionvalue,
    actiondate,
    actiontime,
    nonce,
    difficulty,
  ) {
    this.timestamp = timestamp
    this.hash = hash
    this.lasthash = lasthash
    this.user = user
    this.action = action
    this.actionvalue = actionvalue
    this.actiondate = actiondate
    this.actiontime = actiontime
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString() {
    return `Block -
        timestamp : ${this.timestamp},
        Hash : ${this.hash.substring(0, 10)},
        Last Hash : ${this.lasthash.substring(0, 10)},
        User : ${this.user},
        Action : ${this.action},
        Action Value : ${this.actionvalue},
        Action Date : ${this.actiondate},
        Action Time : ${this.actiontime},
        Nonce : ${this.nonce},
        Difficulty : ${this.difficulty}
        `
  }

  static genesis() {
    return new this(
      1609466949000,
      'F1r5t-h45h',
      '--------------',
      'system',
      'first action',
      'action one',
      '2564-01-01',
      '09:09:09.09',
      0,
      DIFFICULTY,
    )
  }

  static mineBlock(lastBlock, data) {
    const { user, action, actionvalue, actiondate, actiontime } = data
    let hash
    let timestamp
    let lasthash = lastBlock.hash
    let { difficulty } = lastBlock
    let nonce = 0

    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)
      hash = Block.hash(
        timestamp,
        lasthash,
        user,
        action,
        actionvalue,
        actiondate,
        actiontime,
        nonce,
        difficulty,
      )
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    console.log(
      `>>> do this noce: ${nonce} Lasttimestamp: ${lastBlock.timestamp} timestamp: ${timestamp} difficulty: ${difficulty} hash: ${hash}`,
    )

    return new this(
      timestamp,
      hash,
      lasthash,
      user,
      action,
      actionvalue,
      actiondate,
      actiontime,
      nonce,
      difficulty,
    )
  }

  static hash(
    timestamp,
    lasthash,
    user,
    action,
    actionvalue,
    actiondate,
    actiontime,
    nonce,
    difficulty,
  ) {
    return SHA256(
      `${timestamp}${lasthash}${user}${action}${actionvalue}${actiondate}${actiontime}${nonce}${difficulty}`,
    ).toString()
  }

  static blockHash(block) {
    const {
      timestamp,
      lasthash,
      user,
      action,
      actionvalue,
      actiondate,
      actiontime,
      nonce,
      difficulty,
    } = block
    return Block.hash(
      timestamp,
      lasthash,
      user,
      action,
      actionvalue,
      actiondate,
      actiontime,
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
