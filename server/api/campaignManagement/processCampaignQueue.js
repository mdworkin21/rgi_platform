const router = require('express').Router()
const axios = require('axios')
const CampaignQueue = require('../campaignManagement/utilities/campaignQueue')
const uploadImage = require('./utilities/imageManagement')
const taboola = require('./taboola')
const outbrain = require('./outbrain')
const {createCampaignArray} = require('./utilities/campaignCreation')

let campaignQueue = new CampaignQueue()

router.post('/createCampaign', async (req, res, next) => {
  try {

    //WIll call this to upload images to FTP
    // uploadImage()
    
    const campaigns = createCampaignArray(req.body)

    console.log('REQ', req.body)
    for (let i = 0; i < campaigns.length; i++){
      campaignQueue.enqueue(campaigns[i])
    }

    console.log('Campaign', campaignQueue)
    console.log('Length', campaignQueue.length())

    while(campaignQueue.length() > 0){
      let current = campaignQueue.dequeue()

      switch(current.value.platform){
        case 'taboola':
          return
          // taboola.init_createCampaign(current.value)
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