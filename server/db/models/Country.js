const db = require('../database')
const Sequelize = require('sequelize')

const Country = db.define('countries', {
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  taboola_country_code: {
    type: Sequelize.STRING
  },
  outbrain_country_code: {
    type: Sequelize.STRING
  },
  yahoo_country_code: {
    type: Sequelize.STRING
  },
  rev_content_country_code: {
    type: Sequelize.STRING
  }
})

module.exports = Country