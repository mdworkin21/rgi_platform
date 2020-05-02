const router = require('express').Router()
const axios = require('axios')
const {Bid, Country} = require('../../db/models')



router.post('/addBid', async (req, res, next) => {
	try {
		const bid = await Bid.create(req.body)
		res.status(200).send(bid)
	} catch(e) {
		next(e)
	}
})

router.post('/uploadBids', async (req, res, next) => {
	try {
    const bids = await Bid.bulkCreate(req.body)
		res.status(200).send(bids)
	} catch(e) {
		next(e)
	}
})

router.get('/getBids', async (req, res, next) => {
	try {
    const bids = await Bid.findAll()
		res.status(200).send(bids)
	} catch(e) {
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