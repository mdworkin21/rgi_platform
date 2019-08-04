const router = require('express').Router()
const axios = require('axios')
const {db, TaboolaCampaigns, TaboolaCreatives, TaboolaToken} = require('../../db')
//Remember to require in taboola utilities
require('../../../secrets')

const testData = {
  "name": "API_TEST_0001",
  "branding_text": "BlitzLift",
  "cpc": 0.10,
  "spending_limit": 25,
  "spending_limit_model": "MONTHLY",
  "marketing_objective": "DRIVE_WEBSITE_TRAFFIC"
  }
  
  

const getTokenFromDB = async (req, res, next) => {
    try {
      let token = await TaboolaToken.max('id')
      if (Number(token.expirationDate) > 0){
        next()
      } else {
        console.log('TEMP')
        //pass to request token middleware
      }
    } catch(err){
      res.sendStatus(401)
    }
}

const getNewToken = async (req, res, next) => {
  try { 
    console.log('POOP')
    let getoken = await axios.post(`https://backstage.taboola.com/backstage/oauth/token?client_id=${process.env.TAB_CLIENT_ID}&client_secret=${process.env.TAB_CLIENT_SECRET}&grant_type=client_credentials`)

    // getoken = JSON.parse(getoken)
    console.log("GET TOKEN", getoken.data.access_token)
    //process api response, put into object, token, expirationDate, and extra json)
    // res.status(200).send(newToken)
    return getoken.data.access_token
    // let newToken = await TaboolaToken.create({
    //   // token: gettoken,
    //   // expirationDate: getTokenEXP
    // })
  } catch (e) {}
}

// getNewToken()
//creating items endpoint 
// https://backstage.taboola.com/backstage/api/1.0/" + account + "/campaigns/" + campaignId + "/items
 

// router.post('/createCampaign', async (req, res, next) => {
//   try {
//     const token = getNewToken().access_token
//     let headers = {
//       Authorization: `Bearer ${token}`
//     }
//     const response = axios.post(`https://backstage.taboola.com/backstage/api/1.0/blitzlift-sc/campaigns`, testData, headers)
    
//   } catch(e) {
//     next(e)
//   }
// })

const createCampaign = async () => {
  try {

    const token = await getNewToken()
    console.log('TOKEN',  await getNewToken())
    const response = await axios.post(`https://backstage.taboola.com/backstage/api/1.0/blitzlift-sc/campaigns`, testData, {headers: {
      Authorization: 'Bearer' + token
    }})
    
    // console.log("RESPONSE", response)
    return response
    
  } catch(e) {
    console.log('ERRRR', e)
  }
}

module.exports = router