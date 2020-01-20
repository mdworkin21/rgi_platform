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
    for (let i = 0; i < req.body.length; i++){
      campaignQueue.enqueue(req.body[i])
    }

    while(queue.length() > 0){
      let current = queue.dequeue()
      switch(current.platform){
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
    

    console.log('Campaign', campaignQueue)
    console.log('Length', campaignQueue.length())

  } catch(e){
    next(e)
  }

})

module.exports = router