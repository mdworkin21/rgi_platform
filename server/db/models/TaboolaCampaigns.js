const db = require('../database')
const Sequelize = require('sequelize')

const TaboolaCampaign = db.define('taboolaCampaigns', {
  taboolaID: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = TaboolaCampaign