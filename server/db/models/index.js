const Sequelize = require('sequelize')
const db = require('../database')
const User = require('./User')
const SignupToken = require('./SignupTokens')

module.exports = {
  db,
  User,
  SignupToken
}