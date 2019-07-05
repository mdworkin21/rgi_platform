const router = require('express').Router()
const axios = require('axios')
const {db, TaboolaCampaigns, TaboolaCreatives} = require('../../db')
//Remember to require in taboola utilities

router.post('/createCampaign', async (req, res, next) => {
  try {
    //Ping Taboola API to create new campaign, send back id or whatever to front
    res.sendStatus(201)
  } catch(err) {
      next(err)
  }
})

module.exports = router