const router = require('express').Router()
const axios = require('axios')
const {uploadToFtp, drop }= require('./utilities/imageManagement')

router.post('/imageDrop', async(req, res, next) => {
  try {
    console.log("REQQQQ", req.body)
    drop(req.body)
    // uploadToFtp(req.body)
  } catch(e) {}
})