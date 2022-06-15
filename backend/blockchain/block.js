const SHA256 = require('crypto-js/sha256')
const blockChainTable = require('../models/blockchain')

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
  ) {
    this.timestamp = timestamp
    this.hash = hash
    this.lasthash = lasthash
    this.user = user
    this.action = action
    this.actionvalue = actionvalue
    this.actiondate = actiondate
    this.actiontime = actiontime
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
    )
  }

  static async getData() {
    try {
      const blockChainData = await blockChainTable.findAll()

      if (blockChainData) {
        console.log('blockChainData in block: ', blockChainData)
        return blockChainData
      } else {
        console.log('Genesis block: ', this.genesis())
        return [this.genesis()]
      }
    } catch (error) {
      console.log('getData class error: ', error)
      return error
    }
  }

  static getFakeData() {
    const blockchainFound = [
      {
        timestamp: 1653234475987,
        hash: 'F1r5t-h45h',
        lasthash: '--------------',
        user: 'system',
        action: 'first action',
        api: 'api',
        login: '2022-4-10 8: 27: 29.751 +00: 00',
        logout: '2022-4-10 10: 27: 29.751 +00: 00',
      },
      {
        timestamp: 1653465351845,
        hash:
          '34fe77cd8290b093d8c698797a13e9f25eb065adfdfc3b6406d3e66f1e8beda4',
        lasthash: 'F1r5t-h45h',
        user: 'b1',
        action: 'กรอกแบบฟอร์ม รง.9',
        api: '/api/form8',
        login: '2022-5-23 12:05:29.751',
        logout: '2022-5-23 12:25:29.751',
      },
      {
        timestamp: 1653636320654,
        hash:
          '4b6fc160a0c76346de66812918caa5b650a22ed96d047f69177df7364c316f6a',
        lasthash:
          '34fe77cd8290b093d8c698797a13e9f25eb065adfdfc3b6406d3e66f1e8beda4',
        user: 'b2',
        action: 'กรอกแบบฟอร์ม รง.9',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
      {
        timestamp: 1653636385122,
        hash:
          '7a9383849febc51320ca9f9b3de71e4cd27ba130b610a72d100c65c526e02467',
        lasthash:
          '4b6fc160a0c76346de66812918caa5b650a22ed96d047f69177df7364c316f6a',
        user: 'b3',
        action: 'กรอกแบบฟอร์ม รง.9',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
      {
        timestamp: 1653672895735,
        hash:
          '7a9383849febc51320ca9f9b3de71e4cd27ba130b610a72d100c65c526e02467',
        lasthash:
          '2d56a170d23e745c61eda6d62662c5dbc3d7153f9fabbd8be0022775f2f907a6',
        user: 'Hacker6',
        action: 'Fack Data 888',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
      {
        timestamp: 1653672904897,
        hash:
          '7a9383849febc51320ca9f9b3de71e4cd27ba130b610a72d100c65c526e02467',
        lasthash:
          '84bebd52e194b2bd1a2e9c619c8c70a981571c36cb5622e967b9946bd3d79ce0',
        user: 'Hacker7',
        action: 'Fack Data 7777',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
    ]

    try {
      if (blockchainFound) {
        console.log('Fake chain: ', blockchainFound)
        return blockchainFound
      } else {
        console.log('Genesis block: ', this.genesis())
        return this.genesis()
      }
    } catch (error) {
      console.log('getData class error: ', error)
      return error
    }
  }

  static mineBlock(lastBlock, data) {
    const { user, action, actionvalue, actiondate, actiontime } = data
    const timestamp = Date.now()
    const lasthash = lastBlock.hash
    // this.hash = 'todo-hash',
    const hash = Block.hash(
      timestamp,
      lasthash,
      user,
      action,
      actionvalue,
      actiondate,
      actiontime,
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
  ) {
    return SHA256(
      `${timestamp}${lasthash}${user}${action}${actionvalue}${actiondate}${actiontime}`,
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
    } = block
    return Block.hash(
      timestamp,
      lasthash,
      user,
      action,
      actionvalue,
      actiondate,
      actiontime,
    )
  }
}

module.exports = Block
