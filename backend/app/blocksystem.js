const Node = require('../models/node')

class BlockSystem {
  constructor(nodename, isActive, httpPort, p2pPort) {
    ;(this.nodename = nodename),
      (this.isActive = isActive),
      (this.httpPort = httpPort),
      (this.p2pPort = p2pPort)
  }

  monitoring = async () => {
    try {
      const nodeFound = await Node.findOne({
        where: {
          nodename: this.nodename,
        },
      })

      if (nodeFound) {
        // node found
        // update node
        const nodeUpdate = await Node.update({
          isActive: this.isActive,
          http_port: this.httpPort,
          p2p_port: this.p2pPort,
        })

        if (nodeUpdate) {
          console.log('Node updated')
        } else {
          console.log('Node not updated')
        }
      } else {
        const nodeCreate = await Node.create({
          nodename: this.nodename,
          isActive: this.isActive,
          http_port: this.httpPort,
          p2p_port: this.p2pPort,
        })

        if (nodeCreate) {
          console.log('Node created')
        } else {
          console.log('Node can not create')
        }
      }
    } catch (error) {
      console.log('System Error: ', error)
    }

    return !this
  }
}

module.exports = BlockSystem
