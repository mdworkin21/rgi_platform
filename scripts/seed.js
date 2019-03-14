const db = require('../server/db/database')
const SignupTokens = require('../server/db/models/SignupTokens')


const seed = async () => {
  try{
    //add force true when you want to seed
    await db.sync({force: true})
    let defaultUser = await SignupTokens.create({
      email: 'rgi@email.com',
      role: admin,
      signupCode: 'froppit'
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