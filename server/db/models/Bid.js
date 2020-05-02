const db = require('../database')
const Sequelize = require('sequelize')

const Bid = db.define('bid', {
  publisher_id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: 'All',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country_abbr: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  },
  blocks: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Bid