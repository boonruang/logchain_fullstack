const SHA256 = require('crypto-js/sha256')
const blockchain = require('../models/blockchain')
const blockChainTable = require('../models/blockchain')

class Block {
  constructor(timestamp, lasthash, hash, user, action, api, login, logout) {
    this.timestamp = timestamp
    this.lasthash = lasthash
    this.hash = hash
    this.user = user
    this.action = action
    this.api = api
    this.login = login
    this.logout = logout
  }

  toString() {
    return `Block -
        timestamp : ${this.timestamp},
        Last Hash : ${this.lasthash.substring(0, 10)},
        Hash : ${this.hash.substring(0, 10)},
        User : ${this.user},
        Action : ${this.action},
        API : ${this.api},
        Login : ${this.login},
        Logout : ${this.logout},
        `
  }

  static genesis() {
    return new this(
      1653234475987,
      '--------------',
      'F1r5t-h45h',
      'system',
      'first action',
      'api',
      '2022-4-10 8: 27: 29.751 +00: 00',
      '2022-4-10 10: 27: 29.751 +00: 00',
    )
  }

  static getData() {
    const blockchainFound = [
      {
        timestamp: 1653234475987,
        lasthash: '--------------',
        hash: 'F1r5t-h45h',
        user: 'system',
        action: 'first action',
        api: 'api',
        login: '2022-4-10 8: 27: 29.751 +00: 00',
        logout: '2022-4-10 10: 27: 29.751 +00: 00',
      },
      {
        timestamp: 1653465351845,
        lasthash: 'F1r5t-h45h',
        hash:
          '34fe77cd8290b093d8c698797a13e9f25eb065adfdfc3b6406d3e66f1e8beda4',
        user: 'b1',
        action: 'กรอกแบบฟอร์ม รง.9',
        api: '/api/form8',
        login: '2022-5-23 12:05:29.751',
        logout: '2022-5-23 12:25:29.751',
      },
    ]

    try {
      // const blockChainData = await blockChainTable.findAll()

      if (blockchainFound) {
        console.log('blockChainData in block: ', blockchainFound)
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

  static getFakeData() {
    const blockchainFound = [
      {
        timestamp: 1653234475987,
        lasthash: '--------------',
        hash: 'F1r5t-h45h',
        user: 'system',
        action: 'first action',
        api: 'api',
        login: '2022-4-10 8: 27: 29.751 +00: 00',
        logout: '2022-4-10 10: 27: 29.751 +00: 00',
      },
      {
        timestamp: 1653600809058,
        lasthash: 'F1r5t-h45h',
        hash:
          '499db102c59a680deb90da92cee500f02f93e7863b5e812ccfc13f8852b0269b',
        user: 'Hacker1',
        action: 'Fack form 8',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
      {
        timestamp: 1653600817832,
        lasthash:
          '499db102c59a680deb90da92cee500f02f93e7863b5e812ccfc13f8852b0269b',
        hash:
          '470fadaa422ff70a73474cfe7ffd67c49ae74ff6663d0cb10490365a88e62c80',
        user: 'Hacker2',
        action: 'Fack form 9',
        api: '/api/form8',
        login: '2022-5-19 12:05:29.751',
        logout: '2022-5-19 12:25:29.751',
      },
      {
        timestamp: 1653634216960,
        lasthash:
          '470fadaa422ff70a73474cfe7ffd67c49ae74ff6663d0cb10490365a88e62c80',
        hash:
          '7a3bf86e381e448cdcd43891f3f1716b16680df365162959f47711d55e6caa87',
        user: 'Hacker3',
        action: 'Fack form 10',
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
    const { user, action, api, login, logout } = data
    const timestamp = Date.now()
    const lasthash = lastBlock.hash
    // this.hash = 'todo-hash',
    const hash = Block.hash(
      timestamp,
      lasthash,
      user,
      action,
      api,
      login,
      logout,
    )
    return new this(timestamp, lasthash, hash, user, action, api, login, logout)
  }

  static hash(timestamp, lasthash, user, action, api, login, logout) {
    return SHA256(
      `${timestamp}${lasthash}${user}${action}${api}${login}${logout}`,
    ).toString()
  }

  static blockHash(block) {
    const { timestamp, lasthash, user, action, api, login, logout } = block
    return Block.hash(timestamp, lasthash, user, action, api, login, logout)
  }
}

module.exports = Block
