const Sequelize = require('sequelize')
const sequelize = require('../db_instance')

const blockchain = sequelize.define(
  'blockchains',
  {
    timestamp: {
      type: Sequelize.STRING,
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
    api: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    logout: {
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
