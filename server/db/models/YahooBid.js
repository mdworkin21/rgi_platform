const db = require('../database')
const Sequelize = require('sequelize')

const YahooBid = db.define('yahooBids', {
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

  modifier: {
    type: Sequelize.STRING,
  }
})

module.exports = YahooBid