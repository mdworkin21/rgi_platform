const db = require('./database')
const Sequelize = require('sequelize')
const { User,
  TaboolaCampaign,
  TaboolaCreative,
  TaboolaToken,
  TaboolaBid,
  OutbrainBid,
  YahooBid,
  RevContentBid,
  Country} = require('./models')

//Define your associations here
TaboolaCampaign.hasMany(TaboolaCreative)
TaboolaCreative.belongsTo(TaboolaCampaign)

module.exports = {
  db,
  User,
  TaboolaCampaign,
  TaboolaCreative,
  TaboolaToken,
  TaboolaBid,
  OutbrainBid,
  YahooBid,
  RevContentBid,
  Country

}