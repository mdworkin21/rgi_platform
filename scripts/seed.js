const db = require('../server/db/database')
const fs = require('fs')
const User = require('../server/db/models/User')
const {TaboolaToken} = require('../server/db/models/')



if (process.env.NODE_ENV !== 'production') require('../secrets')
const seed = async () => {
  try{
    await db.sync({force: true})
      await User.create({
        email: process.env.SEED_EMAIL,
        isAdmin: true,
        password: process.env.SEED_ADMIN_PASSWORD
      })

      await TaboolaToken.create({
        token: '123abc'
      }),

      await TaboolaToken.create({
        token: '123444abc'
      }

    )
  }catch(err){
    console.log(err)
  }
} 

const runSeed = async () => {
  console.log('seeedingggg....')
  try{
    await seed()
  } catch(err){
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('connection closed')
  }
}

if (module === require.main){
  runSeed()
}

module.exports = seed