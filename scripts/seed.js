const db = require('../server/db/database')
const SignupTokens = require('../server/db/models/SignupTokens')


if (process.env.NODE_ENV !== 'production') require('../secrets')
const seed = async () => {
  try{
    await db.sync({force: true})
    let defaultUser = await SignupTokens.create({
      email: process.env.SEED_EMAIL,
      role: 'admin',
      signupCode: process.env.SEED_SIGN_UP_CODE
    })
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