const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/rgi_platform', {logging: false})

//This file creates the db connection with postgres. Models are defined in their own folders.
module.exports = db