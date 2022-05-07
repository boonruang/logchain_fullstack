const Node = require('../models/node')

class BlockSystem {
  constructor(nodeName, isActive, serverIP, httpPort, p2pPort) {
    ;(this.nodeName = nodeName),
      (this.isActive = isActive),
      (this.serverIP = serverIP),
      (this.httpPort = httpPort),
      (this.p2pPort = p2pPort)
  }

  monitoring = async () => {
    try {
      const nodeFound = await Node.findOne({
        where: {
          nodename: this.nodeName,
        },
      })

      if (nodeFound) {
        // node found
        // update node
        const nodeUpdate = await Node.update(
          {
            isActive: this.isActive,
            server_ip: this.serverIP,
            http_port: this.httpPort,
            p2p_port: this.p2pPort,
          },
          { where: { nodename: this.nodeName } },
        )

        if (nodeUpdate) {
          console.log('Node updated')
        } else {
          console.log('Node not updated')
        }
      } else {
        const nodeCreate = await Node.create({
          nodename: this.nodeName,
          isActive: this.isActive,
          server_ip: this.serverIP,
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
