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
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: tue
    }
  }
})

module.exports = TaboolaToken