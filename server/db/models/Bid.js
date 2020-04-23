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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country_abbr: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  blocks: {
    type: Sequelize.INTEGER
  },

  enabled: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Bid