const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const node = sequelize.define(
  'nodes',
  {
    // attributes
    nodename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    server_ip: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    http_port: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    p2p_port: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    //option
  },
)

;(async () => {
  await node.sync({ force: false })
})()

module.exports = node
