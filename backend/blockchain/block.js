const SHA256 = require('crypto-js/sha256')

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
    return new this('first-time', '--------------', 'F1r5t-h45h', [])
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
