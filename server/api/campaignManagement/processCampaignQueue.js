const router = require('express').Router()
const axios = require('axios')
const CampaignQueue = require('../campaignManagement/utilities/campaignQueue')
const uploadImage = require('./utilities/imageManagement')
const taboola = require('./taboola')
const outbrain = require('./outbrain')

let campaignQueue = new CampaignQueue()

router.post('/createCampaign', async (req, res, next) => {
  try {

    //WIll call this to upload images to FTP
    // uploadImage()
    
    console.log('REQ', req.body)
    for (let i = 0; i < req.body.data.length; i++){
      campaignQueue.enqueue(req.body.data[i])
    }

    console.log('Campaign', campaignQueue)
    console.log('Length', campaignQueue.length())

    while(campaignQueue.length() > 0){
      let current = campaignQueue.dequeue()

      switch(current.value.platform){
        case 'taboola':
          taboola.init_createCampaign(current)
          break
        case 'outbrain':
          // outbrain.init_createCampaign(current)
          break
        default:
          break
      }
    }

  } catch(e){
    next(e)
  }

})

module.exports = router