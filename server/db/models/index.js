const Sequelize = require('sequelize')
const db = require('../database')
const User = require('./User')
const TaboolaCreative = require('./TaboolaCreatives')
const TaboolaCampaign = require('./TaboolaCampaigns')

module.exports = {
  db,
  User,
  TaboolaCreative,
  TaboolaCampaign
}