const Sequelize = require('sequelize')
const sequelize = require('../db_instance')

const blockchain = sequelize.define(
  'blockchains',
  {
    timestamp: {
      type: 'TIMESTAMP',
      primaryKey: true,
      allowNull: false,
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lasthash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionvalue: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actiondate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actiontime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
)

;(async () => {
  await blockchain.sync({ force: false })
})()

module.exports = blockchain
