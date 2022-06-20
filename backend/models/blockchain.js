const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

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
    nonce: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.INTEGER,
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
