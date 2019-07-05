//Put Taboola API Functions here
let TABOOLA_ACCOUNTS = {
  sportschew: 'sportschew-sc',
  blitzlift: 'blitzlift-sc',
  dogsome: 'ifroppit-dogsome-sc',
  insidetonight: 'redgobo-insidetonightcom-sc',
  hopeshared: 'ifroppit-hopeshared-sc',
  popularhealth: 'redgobo-popularhealth-sc'
}

function taboola_getAccountDetails(){
  // if no stored token available, fetch new token
  let token = taboola_setToken();
  
  let params = {
      "method" : "get",
      "contentType": "application/json",
      "headers" : { "Authorization" : "Bearer " + token }
  };

  let auth_response = UrlFetchApp.fetch("https://backstage.taboola.com/backstage/api/1.0/ifroppit/advertisers/", params);
  
  Logger.log(auth_response);
  return JSON.parse(auth_response);
}

function taboola_getTokenStatus(){
  // if no stored token available, fetch new token
  let token = PropertiesService.getScriptProperties().getProperty("taboola_token");

  if(token === null){
    Logger.log(token);
    return null;
  }
  
  let params = {
      "method" : "get",
      "contentType": "application/json",
      "headers" : { "Authorization" : "Bearer " + token },
      "muteHttpExceptions": true
  };

  let auth_response = UrlFetchApp.fetch("https://backstage.taboola.com/backstage/api/1.0/ifroppit/advertisers/", params);
  return auth_response.getResponseCode();
}

function taboola_setToken() {

  let tokenStatus = taboola_getTokenStatus();
  
  if(tokenStatus === 200){
    Logger.log("Existing token is valid");
    return PropertiesService.getScriptProperties().getProperty("taboola_token");
  }
  
  PropertiesService.getScriptProperties().deleteProperty('taboola_token');
  
  const client_id = '97687147a608424c80ac7be585394917';
  const client_secret = '48d08c7854c64aa3a18ce1e9db93f88a';
  const account_name = 'ifroppit';
  
  let params = {
    "method" : "post",
    "contentType": "application/x-www-form-urlencoded",
    "muteHttpExceptions": true
  };

  let auth_response = UrlFetchApp.fetch("https://backstage.taboola.com/backstage/oauth/token?client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=client_credentials", params);
  let authObj = JSON.parse(auth_response);
  let token = authObj.access_token;
  Logger.log('Token: ' + token);
  
  PropertiesService.getScriptProperties().setProperty("taboola_token", token);
  
  return PropertiesService.getScriptProperties().getProperty("taboola_token");
}

function taboola_getTokenDetails(){
  // if no stored token available, fetch new token
  let token = PropertiesService.getScriptProperties().getProperty("taboola_token") || taboola_setToken();
  
  let params = {
      "method" : "get",
      "contentType": "application/json",
      "headers" : { "Authorization" : "Bearer " + token },
    "muteHttpExceptions": true
  };

  let auth_response = UrlFetchApp.fetch("https://backstage.taboola.com/backstage/api/1.0/token-details/", params);
  
  if(auth_response.getResponseCode() == 401){
    return 401;
  }
  
  Logger.log(JSON.parse(auth_response));
  return JSON.parse(auth_response);
}

function taboola_getTokenExpiry(){
  let details = taboola_getTokenDetails();
  let expiry = details['expires_in'] / 60 / 60;
  Logger.log("Expires In: [%s] hours.", expiry.toFixed(2));
}

function taboola_getDictionary(){
  let token = PropertiesService.getScriptProperties().getProperty("taboola_token") || taboola_setToken();
  
  let params = {
    "method" : "get",
    "contentType": "application/json",
    "headers" : { "Authorization" : "Bearer " + token },
    "muteHttpExceptions": true
  };
  
  let auth_response = UrlFetchApp.fetch("https://backstage.taboola.com/backstage/api/1.0/blitzlift-sc/dictionary/audience_segments", params);
  Logger.log(auth_response);
  
}
module.exports = {
  TABOOLA_ACCOUNTS,
  taboola_getAccountDetails,
  taboola_getTokenStatus,
  taboola_setToken,
  taboola_getTokenDetails
}