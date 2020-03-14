const router = require('express').Router()
const axios = require('axios')
const {uploadImage} = require('./utilities/imageManagement')

router.post('/uploadImage', async (req, res, next) => {
	try {
		console.log(req.body, uploadImage, typeof uploadImage)
		const uploadedImage = await uploadImage(req.body.image)
		res.status(200).send(uploadedImage)
	} catch(e) {
		next(e)
	}
})

module.exports = router