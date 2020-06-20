const router = require('express').Router()
const axios = require('axios')
const {  TaboolaBid,
  OutbrainBid,
  YahooBid,
  RevContentBid,
  Country} = require('../../db/models')
const db = require('../../db/database')

router.post('/addBid', async (req, res, next) => {
	try {
		let newBid = req.body.publisher_id
		
		const bid = await Bid.create({
			publisher_id: newBid.publisher_id,
			country: newBid.country,
			country_abbr: newBid.country_abbr,
			blocks: newBid.blocks,
			modifier: newBid.modifier
		})
		res.status(200).send(bid)
	} catch(e) {
		next(e)
	}
})

router.post('/uploadBids/:tableName', async (req, res, next) => {
	try {
		let table = req.params.tableName
		let bids; 

		if (table === 'TaboolaBid'){
			bids = await TaboolaBid.bulkCreate(req.body)
		} else if (table === 'OutbrainBid'){
			bids = await OutbrainBid.bulkCreate(req.body)
		} else if (table === 'YahooBid'){
			bids = await YahooBid.bulkCreate(req.body)
		} else if (table === 'RevContentBid'){
			bids = await RevContentBid.bulkCreate(req.body)
		}

		res.status(200).send(bids)
	} catch(e) {
		next(e)
	}
})

router.get('/getBids/:tableName', async (req, res, next) => {
	try {

		let table = req.params.tableName
		let bids; 

		if (table.indexOf('taboolabid') > -1){
			bids = await TaboolaBid.findAll()
		} else if (table.indexOf('outbrainbid') > -1){
				bids = await OutbrainBid.findAll()
		} else if (table.indexOf('yahoobid') > -1){
				bids = await YahooBid.findAll()
		} else if (table.indexOf('revcontentbid') > -1){
				bids = await RevContentBid.findAll()
		}
		res.status(200).send(bids)
	} catch(e) {
		next(e)
	}
})

router.get('/whatever', async (req, res, next) => {
	try{
		res.status(200).send(Object.keys(db.models))
	} catch(e){
		next(e)
	}
})

router.post('/uploadCountries', async (req, res, next) => {
	try {

    const bids = await Country.bulkCreate(req.body)
		res.status(200).send(bids)
	} catch(e) {
		next(e)
	}
})


router.post('/addCountry', async (req, res, next) => {
	try {
		console.log("HIT", 'ADD COUNTRY', req.body)
    const country = await Country.create(req.body)
		res.status(200).send(country)
	} catch(e) {
		next(e)
	}
})

router.get('/getCountries', async (req, res, next) => {
	try {
		const countries = await Country.findAll()
		res.status(200).send(countries)
	} catch(e) {
		next(e)
	}
})


module.exports = router