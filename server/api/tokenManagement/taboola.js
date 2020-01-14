const axios = require('axios')
const {TaboolaToken} = require('../../db')
const Sequelize = require('sequelize')
require('../../../secrets')
//Remember to require in taboola utilities

const getTokenFromDB = async () => {
    try {
      let token = await TaboolaToken.findAll({
        group: ['id'],
        order: Sequelize.literal('max(id) DESC')
      })

      return token[0].dataValues  
    } catch(err){
      console.error('Error: ', err)
    }
}

const getTokenStatus = async () => {
  let getToken = await getTokenFromDB()

  let headers =  {
    headers: {
    Authorization: 'Bearer ' + getToken.token
    }}

    try {
      let auth_response = await axios.get("https://backstage.taboola.com/backstage/api/1.0/ifroppit/advertisers/", headers);
      
      if (auth_response.status === 200){
        return getToken.token;
      } else {
        return false
      }
    } catch(e) {
        console.error(e.response.status)
        return false
  }  
}
 
const setToken = async () => {
  try {
    let validToken = await getTokenStatus()

    if (!validToken){
      let newToken = await axios.post(`https://backstage.taboola.com/backstage/oauth/token?client_id=${process.env.TAB_CLIENT_ID}&client_secret=${process.env.TAB_CLIENT_SECRET}&grant_type=client_credentials`)

      if (newToken.status === 200){
        let newTokenSet = await TaboolaToken.create({
          token: newToken.data.access_token
        })
      }
    } else {
      return validToken
    }
  } catch(e) {}
}

module.exports = {getTokenFromDB, setToken}