const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const role = sequelize.define(
  'roles',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
  },
  {
    //option
  },
)

;(async () => {
  await role.sync({ force: false })
})()

module.exports = role
