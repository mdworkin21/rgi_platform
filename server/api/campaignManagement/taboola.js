const router = require('express').Router()
const axios = require('axios')
const {db, TaboolaCampaigns, TaboolaCreatives, TaboolaToken} = require('../../db')
const token = require('../tokenManagement/taboola')
//Remember to require in taboola utilities
require('../../../secrets')

const init_createCampaign = (campaignData) => {

  const token = token.setToken();  
  const account = campaignData.account;
  let campaign = createCampaign(campaignData);
  if(campaign['http_status'] == 400){
    console.log("Error!", campaign);
    return;
  }
  
  var campaignId = campaign.id;

  console.log('Campaign created: ' + campaignId + ' - ' + JSON.stringify(campaign));
  var items = createItemArray(campaignData);
  console.log('Item array created: ' + JSON.stringify(items));
  
  // create the correct number of campaign items
  for(var i = 0; i < items.length; i++){
    var item = taboola_createItem(account, campaignId, items[i].url);
    items[i].response = item;
  }
  
  for(var x = 0; x < items.length; x++){
    checkItemStatus(account, items[x]);
    updateItem(account, items[x]);
  }
  return campaignId;
}

const createCampaign = async (campaignData) => {

  // const example_json = {
  //   "name": "API_TEST_0001",
  //   "branding_text": "BlitzLift",
  //   "cpc": 0.10,
  //   "spending_limit": 25,
  //   "spending_limit_model": "MONTHLY",
  //   "marketing_objective": "DRIVE_WEBSITE_TRAFFIC"
  // }

  try {
    const response = await axios.post(`https://backstage.taboola.com/backstage/api/1.0/${account}/campaigns`,
      campaignData.payload, 
      {
        headers: {
        Authorization: 'Bearer ' + token
        }
      })
    
    // console.log("RESPONSE", response)
    return response
    
  } catch(e) {
    console.log('createCampaign err', e);
  }
}

const createItem = async (account, campaignId, url) => {
  let payload = {
    "url": url
  }
  try {
    const response = await axios.post(`https://backstage.taboola.com/backstage/api/1.0/${account}/campaigns/${campaignId}/items`,
      payload, 
      { 
        headers: {
          Authorization: 'Bearer ' + token
        }
    })

    return response
  } catch(e) {
    console.log('createItem err', e);
  }
}

const updateItem = async (account, item) => {
  
  let payload = {
    "title": item.headline,
    "thumbnail_url": item.image
  }

  try {
    const response = await axios.post(`https://backstage.taboola.com/backstage/api/1.0/${account}/campaigns/${item.response.campaign_id}/items/${item.response.id}`,
      payload, 
      { 
        headers: {
          Authorization: 'Bearer ' + token
        }
    })

    return response
  } catch(e) {
    console.log('updateItem err', e);
  }
}

const checkItemStatus = async (account, item) => {

  let payload = {
    "url": item.url
  }
  
  try {
    const response = await axios.post(`https://backstage.taboola.com/backstage/api/1.0/${account}/campaigns/${item.response.campaign_id}/items/${item.response.id}`,
      payload, 
      { 
        headers: {
          Authorization: 'Bearer ' + token
        }
    })
    if(response.status === "CRAWLING"){
      // if item is still CRAWLING, recursively check status
      taboola_checkItemStatus(account, item);
    } else {
      return true;
    }
  } catch(e) {
    console.log('checkItemStatus err', e);
  }
}

const createPayload = (campaignData) => {
  let payload = { 
    "name": createCampaignName(campaignData),
    "branding_text": getBrandingText(campaignData.site),
    "marketing_objective": "DRIVE_WEBSITE_TRAFFIC",
    "tracking_code": createTrackingCode(campaignData),
    // determine cpc by device
    "cpc": campaignData.cpc, // NEED TO CREATE LOGIC FOR WHICH CPC TO USE
    "spending_limit": 100000,
    "daily_cap": campaignData.daily_cap, // NEED TO CREATE LOGIC FOR WHICH DAILY CAP
    "spending_limit_model": "MONTHLY",
    "daily_ad_delivery_model": "STRICT",
    "bid_type": "OPTIMIZED_PAGEVIEWS",
    "country_targeting": {
      "type": "INCLUDE",
      "value": ["US"]
    },
    "platform_targeting": {
      "type": "INCLUDE",
      "value": [campaignData.device === "desktop" ? "DESK" : "PHON"]
    },
    "traffic_allocation_mode": "OPTIMIZED",
    "comments": ""
  }

  if(campaignData.device === "mobile"){
    payload["os_targeting"] = {
      "type": "EXCLUDE",
      "value": [{"os_family": "iOS"}]
    }
  }
  
  if(campaignData.targeting === "BLACKLIST"){
    payload["publisher_targeting"] = {
      "type": "EXCLUDE",
      "value": ["msn-msn", "msn-defaulthomepage", "foxnews-foxnews", "msn-msn-home", "msn-display-us", "msn-windowsapps-news-us", "espnappsnetwork-espnandroid", "espnnetwork-espn", "foxnews-androidapp", "msn-windowsapps-news-us-home", "foxnews-foxbusiness", "msn-windowsapps-money-us", "msn-windowsapps-money-us-home", "msn-msn-es", "msn-windowsapps-sports-us", "msn-chromeextension", "msn-hotmailoutlook-us", "msn-ie11-france", "msn-mahjong-js-us", "msn-netherlands", "msn-can", "msn-uae", "msn-uk", "msn-ie11-hungary", "msn-windowsapps-sports-us-win8", "msn-edgedefaulthomepage-uk", "msn-france", "msn-ie11-uk", "msn-ie11-poland", "msn-uk-home", "msn-australia", "msn-india-homepage-hi", "msn-windowsapps-news-us-android", "msn-malaysia-home", "msn-edgedefaulthomepage-colombia", "msn-germany", "msn-ie11-portugal", "msn-malaysia", "msn-ie11-czechrepublic", "msn-ie11-australia", "msn-edgedefaulthomepage-russia", "espnnetwork-cricinfo", "msn-jp", "msn-edgedefaulthomepage-japan", "msn-casualgames-msngamescom", "msn-australia-home", "msn-latam", "msn-ie", "msn-en-ww", "msn-spain", "msn-hotmailoutlook-uk", "msn-germany-home", "msn-edgedefaulthomepage-newzealand", "msn-edgedefaulthomepage-philippines", "foxnews-iosapp", "msn-windowsapps-sports-us-win8-home", "msn-southafrica", "msn-casualgames-microsoftsolitairecollection-js-us", "msn-display-can", "msn-edgedefaulthomepage-portugal", "espnnetwork-espnfcbrazil", "msn-uae-home", "msn-hotmailoutlook-canada", "msn-phillipines-home", "msn-outlook-denmark", "msn-outlook-austria-en", "msn-windowsapps-news-france-ios", "msn-outlook-thailand-en", "msn-windowsapps-news-canada-ios", "msn-ie11-russia", "espnnetwork-espnglobal", "msn-outlook-finland-en", "espnfantasynetwork-tournamentchallenge", "msn-edgedefaulthomepage-india", "msn-latam-home", "msn-ie11-turkey", "msn-display-france", "msn-display-japan", "msn-outlook-hongkong-en", "msn-edgedefaulthomepage-malaysia", "msn-casualgames-microsoftmahjong", "msn-outlook-ecuador", "espnappsnetwork-espncricinfoandroid", "espnappsnetwork-espnios", "msn-ie11-spain", "msn-greece", "msn-windowsapps-news-india-home", "msn-outlook-dominicanrepublic", "msn-portugal-home", "msn-casualgames-microsoftsolitairecollection-france", "msn-denmark", "msn-korea", "msn-display-uk", "msn-hotmailoutlook-france", "msn-newzealand", "msn-edgedefaulthomepage-korea", "msn-spain-home", "msn-outlook-southafrica", "msn-korea-home", "msn-ie11-netherlands", "msn-india-hi", "espnfantasynetwork-espn", "msn-edgedefaulthomepage-turkey", "msn-edgedefaulthomepage-france", "msn-indonesia", "msn-portugal", "msn-outlook-mexico", "msn-ie11-thailand", "msn-outlook-india-en", "msn-chile", "msn-ie11-austria", "msn-ie11-latinamericas", "msn-edgedefaulthomepage-mexico", "msn-edgedefaulthomepage-latinamericas", "msn-ie11-en-ww", "msn-edgedefaulthomepage-en-ww", "msn-ie11-mexico", "msn-outlook-australia", "msn-windowsapps-news-japan-ios", "msn-outlook-poland", "msn-brazil-home", "msn-outlook-turkey-en", "msn-edgedefaulthomepage-thailand", "msn-france-home", "msn-phillipines", "msn-windowsapps-news-russia", "msn-italy-home", "msn-outlook-spain-es", "msn-turkey", "msn-casualgames-microsoftmahjong-canada", "msn-argentina", "msn-outlook-philippines", "msn-singapore-home", "msn-edgedefaulthomepage-peru", "msn-outlook-ae-en", "msn-windowsapps-news-korea", "msn-italy", "msn-brazil", "msn-outlook-korea", "msn-edgedefaulthomepage-israel", "msn-mahjong-js-gb", "msn-ie11-ireland", "msn-can-home", "msn-windowsapps-sports-us-home", "msn-hungary", "msn-chromeextension-usspanish", "msn-newzealand-home", "msn-mahjong-js-ca", "msn-outlook-guatemala", "msn-outlook-taiwan", "msn-edgedefaulthomepage-poland", "msn-austria", "msn-netherlands-home", "espnnetwork-undefeated", "msn-outlook-hongkong", "msn-outlook-costarica", "msn-windowsapps-news-us-es-win8", "msn-turkey-home", "msn-il", "msn-singapore", "msn-outlook-german-de", "msn-outlook-malaysia", "msn-hotmailoutlook-netherlands", "msn-edgedefaulthomepage-canada", "msn-mahjong-js-japan", "msn-ie11-southafrica", "msn-india-home", "msn-ie11-greece", "msn-ie11-singapore", "msn-ie11-japan", "msn-edgedefaulthomepage-germany", "msn-edgedefaulthomepage-spain"]
    }
  }
  //Logger.log(JSON.stringify(payload));
  return payload;
}

module.exports = router