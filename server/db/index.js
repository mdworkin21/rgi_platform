const db = require('./database')
const Sequelize = require('sequelize')
const User = require('../db/models')
const {TaboolaCreative, TaboolaCampaign} = require('./models')

//Define your associations here
TaboolaCampaign.hasMany(TaboolaCreative)
TaboolaCreative.belongsTo(TaboolaCampaign)

module.exports = {
  db,
  User,
  TaboolaCampaign,
  TaboolaCreative
}