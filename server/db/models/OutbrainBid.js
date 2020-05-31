const db = require('../database')
const Sequelize = require('sequelize')

const OutbrainBid = db.define('outbrainBids', {
  section_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  section_id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  country: {
    type: Sequelize.STRING,
    defaultValue: 'All',
    allowNull: false
  },
  country_abbr: {
    type: Sequelize.STRING,
    defaultValue: 'All',
  },
  blocks: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  modifier: {
    type: Sequelize.STRING,
  }
})

module.exports = OutbrainBid