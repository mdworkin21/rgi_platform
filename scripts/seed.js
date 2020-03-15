const db = require('../server/db/database')
const fs = require('fs')
const User = require('../server/db/models/User')
const {TaboolaToken, Blocks} = require('../server/db/models/')



// --- START CSV IMPORT ____ 
//This loadCSV function should be put in utilities, and generalized for other CSVs, right now it just works for Blocks.csv (locally)-- still need to figure out production strategy
// Primary function in file, will load and parse cvs file
function loadCSV(filename){
  let data = fs.readFileSync(filename, {encoding: 'utf-8'})
  //Last line is empty for some reason and causes problems for inserting
  data = data.split('\n').map(row => row.split(',')).slice(1, -1)

  data = data.map((row) => {
    if (row[1]){
      row[1] = row[1].replace('\r', '').trim()
    }
    let country = row[1] === 'x' ? 'All' : countryCodes[row[1]]
    let abbreviations = row[1] === 'x' ? 'All' : row[1]

    return {
      publisher_id: row[0],
      country: country,
      country_abbr: abbreviations
    }
  })
  return data
}

const countryCodes= {
  x: 'All',
  AU: 'Austrailia',
  IN: 'India',
  JP: 'Japan',
  MX: 'Mexico'
}

// let records = loadCSV(process.env.BLOCKS)

// --- End CSV IMPORT ---


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
      },
      
      // await Blocks.bulkCreate(records)

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