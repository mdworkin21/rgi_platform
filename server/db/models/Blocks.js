const db = require('../database')
const Sequelize = require('sequelize')

const Blocks = db.define('blocks', {
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
  }
} )

module.exports = Blocks