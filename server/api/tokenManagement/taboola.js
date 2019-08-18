const router = require('express').Router()
const axios = require('axios')
const {db, TaboolaCampaigns, TaboolaCreatives, TaboolaToken} = require('../../db')
//Remember to require in taboola utilities
require('../../../secrets')

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

const setToken = async (req, res, next) => {
  try { 
    let getToken = await axios.post(`https://backstage.taboola.com/backstage/oauth/token?client_id=${process.env.TAB_CLIENT_ID}&client_secret=${process.env.TAB_CLIENT_SECRET}&grant_type=client_credentials`)

    // getoken = JSON.parse(getoken)
    console.log("GET TOKEN", getToken.data.access_token)
    //process api response, put into object, token, expirationDate, and extra json)
    // res.status(200).send(newToken)
    return getToken.data.access_token
    // let newToken = await TaboolaToken.create({
    //   // token: gettoken,
    //   // expirationDate: getTokenEXP
    // })
  } catch (e) {}
}