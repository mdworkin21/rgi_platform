const db = require('../database')
const Sequelize = require('sequelize')

const TaboolaToken = db.define('taboolaTokens', {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
},
  expirationDate: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = TaboolaToken