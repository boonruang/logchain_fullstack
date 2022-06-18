let nodename = process.env.NODE_NAME || 'NODE1'
const NODE_NAME = nodename.trim()
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `./${NODE_NAME}_db.sqlite`,
})

;(async () => {
  await sequelize.authenticate()
})()

module.exports = sequelize
