const Sequelize = require('sequelize')
const sequelize = require('../db_instance')

const user = sequelize.define(
  'users',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      defaultValue: 'normal',
    },
  },
  {
    //option
  },
)

;(async () => {
  await user.sync({ force: false })
})()

module.exports = user
