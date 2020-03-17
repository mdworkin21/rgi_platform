const router = require('express').Router()
const axios = require('axios')
const {Blocks} = require('../../db/models')
const fs = require('fs')


router.post('/uploadBlocks', async (req, res, next) => {
	try {
    const blocks = await Blocks.bulkCreate(req.body)
		res.status(200).send(blocks)
	} catch(e) {
		next(e)
	}
})


router.get('/getBlocks', async (req, res, next) => {
	try {
    const blocks = await Blocks.findAll()
		res.status(200).send(blocks)
	} catch(e) {
		next(e)
	}
})
module.exports = router