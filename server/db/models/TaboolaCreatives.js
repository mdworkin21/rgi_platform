const db = require('../database')
const Sequelize = require('sequelize')

const Creatives = db.define('creatives', {
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  headline: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
} )

module.exports = Creatives