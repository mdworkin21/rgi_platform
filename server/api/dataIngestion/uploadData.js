const router = require('express').Router()
const axios = require('axios')
const {Blocks} = require('../../db/models')
const fs = require('fs')

function loadCSV(filename){
  let data = fs.readFileSync(filename, {encoding: 'utf-8'})
  //Last line is empty for some reason and causes problems for inserting
  console.log('DATAAA', data)
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


router.post('/uploadBlocks', async (req, res, next) => {
	try {
    console.log('REQ Body', req.body)

    // let records = loadCSV(`${process.env.HOME}/Desktop/${req.body.file}`)
    console.log('RECORDS', records)
    // const blocks = await Blocks.bulkCreate(records)
		res.status(200).send('blocks')
	} catch(e) {
		next(e)
	}
})

module.exports = router