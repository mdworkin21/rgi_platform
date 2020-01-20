const router = require('express').Router()
const axios = require('axios')
const CampaignQueue = require('../campaignManagement/utilities/campaignQueue')
const uploadImage = require('./utilities/imageManagement')


let campaignQueue = new CampaignQueue()

router.post('/createCampaign', async (req, res, next) => {
  try {

    //WIll call this to upload images to FTP
    // uploadImage()
    
    console.log('REQ', req.body)
    for (let i = 0; i < req.body.length; i++){
      campaignQueue.enqueue(req.body[i])
    }

    

    console.log('Campaign', campaignQueue)
    console.log('Length', campaignQueue.length())

  } catch(e){
    next(e)
  }

})

module.exports = router