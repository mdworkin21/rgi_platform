const router = require('express').Router()
const axios = require('axios')
const {uploadImage} = require('./utilities/imageManagement')

router.post('/uploadImage', async (req, res, next) => {
	try {
		console.log(req.body, uploadImage, typeof uploadImage)
		await uploadImage(req.body.image)
	} catch(e) {
		next(e)
	}
})

module.exports = router