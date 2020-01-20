const createCampaignArray = (data) => {
  const campaignArr = []
  // loop through keys to find campaign types

  for(let key in data){
    // only continue if key is a campaign type and is true 
    if(key.indexOf('type_') !== 0 || !data[key]) continue

    let type = key.split('_')
    let campaignObj = {
      campaign_name: data.campaign_name,
      url: data.url,
      site: data.url.replace(/.*\:\/\/|\..*/g, ''),
      platform: type[1],
      device: type[2],
      targeting: type[3] ? type[3] : '',
      cpc: data[`cpc_${type[1]}_${type[2]}`],
      daily_cap: data[`daily_cap_${type[1]}`],
      images: data.images,
      headlines: data.headlines
    }

    campaignObj.name = createCampaignName(campaignObj)

    // if outbrain and ob_tag enabled, add tag to campaignObject
    if(campaignObj.platform === 'outbrain'){
      campaignObj.ob_tag = data.ob_tag_enabled ? data.ob_tag : false
    }

    campaignArr.push(campaignObj);
  }

  return campaignArr
}

const determineSiteInitials = (siteName) => {
  let site;

  if(siteName.indexOf('sportschew') > -1){
    site = 'SC';
  } else if(siteName.indexOf('blitzlift') > -1){
    site = 'BL';
  } else if(siteName.indexOf('dogsome') > -1){
    site = 'DS';
  } else if(siteName.indexOf('insidetonight') > -1){
    site = 'IT';
  } else if(siteName.indexOf('popularhealth') > -1){
    site = 'PH';
  } else if(siteName.indexOf('hopeshared') > -1){
    site = 'HS';
  }

  return site;
}

const determineCampaignTypeString = (campaignData) => {
  let type = '';

  // if premium for Outbrain
  if(campaignData.targeting === 'PREMIUM'){
    type = 'Premium - ';
  }
    // if MSN for Taboola or Outbrain
  else if(campaignData.targeting === 'MSN'){
    type = 'TGT_M - ';
  }
  // if platform is Taboola
  else if(campaignData.platform === 'taboola'){
    switch(campaignData.targeting){
      case 'ESPN':
        type = 'TGT_E - ';
        break;
      case 'FOX':
        type = 'TGT_F - ';
        break;
      case 'BLACKLIST':
        type = 'Blacklist - ';
        break;
    }
  }
  return type
}

const createItemArray = (campaignData) => {
  
  const items = [];
  const url = campaignData.url;
  let images = campaignData.images;
  let headlines = campaignData.headlines;
  const campaignUTM = createCampaignUTM(campaignData);

  // if OB & obTag is enabled, add tag to all headlines
  if(campaignData.platform === 'outbrain' && campaignData.ob_tag){
    headlines = headlines.map(function(e){
      return '[' + campaignData.ob_tag + '] ' + e;
    })
  }
    
  let counter = 0;
  // loop through images and create separate URL for each image/headline letiation
  for(let i = 0; i < images.length; i++){
    for(let h = 0; h < headlines.length; h++){
      let item = {};
      // create item URL. If URL has '?', start with ampersand.
      item.url = url + (url.indexOf("?") > -1 ? "&" : "?") + "v=" + campaignUTM + "-" + counter + "&utm_content=" + campaignUTM + "-" + counter;
      
      // determine item object structure for Taboola vs. Outbrain
      if(campaignData.platform === 'taboola'){
        item.image = images[i];
        item.headline = headlines[h];
      } else {
        item.imageUrl = images[i];
        item.text = headlines[h];
        item.enabled = true;
      }
      
      items.push(item);
      counter++;
    }
  }

  return items;
}

// create utm_campaign URL parameter
const createCampaignUTM = (campaignData) => {
  let platform;
  let targeting;

  if (campaignData.platform === "taboola"){
    platform = 't';
  } else if (campaignData.platform === "outbrain"){
    platform = 'o';
  } else if (campaignData.platform === "yahoo"){
    platform = 'y';
  }
  
  const device = campaignData.device === "desktop" ? '' : '9';
  
  if (campaignData.targeting === "MSN"){
    targeting = 'm';
  } else if (campaignData.targeting === "ESPN"){
    targeting = 'e';
  } else if (campaignData.targeting === "FOX"){
    targeting = 'f';
  } else if (campaignData.targeting === "BLACKLIST"){
    targeting = 'b';
  } else if (campaignData.targeting === "PREMIUM"){
    targeting = 'p';
  } else {
    targeting = '';
  }
  
  return platform + device + targeting + campaignData.campaign;
}

// create URL tracking code by vendor
const createTrackingCode = (campaignData) => {
  if(campaignData.platform === "taboola"){
    return "utm_source=taboola&utm_medium={site}&utm_term={title}&utm_campaign=" + createCampaignUTM(campaignData);
  } else if(campaignData.platform === "outbrain"){
    return "utm_source=outbrain&utm_medium={{section_name}}&utm_term={{ad_title}}&utm_campaign=" + createCampaignUTM(campaignData);
  }
}

// determine dynamic campaign details from campaignData
const addDynamicCampaignData = (formData) => {
  const campaign = /*FORM_DATA*/
 
  campaign.site = campaign.url.replace(/http\:\/\/|\..*/g,'');

  // if not admin, append media buyer code to campaign name
  campaign.campaign += campaign.media_buyer === "admin" ? "" : "_" + campaign.media_buyer;
  
  // // split cpc to turn 0.15|0.08 into [0.15, 0.08]
  // campaign.cpc = campaign.cpc.split("|").map(function(e){
  //   return parseFloat(e);
  // })

  // // if only one daily_cap provided, duplicate it for proper format [0.12, 0.12]
  // campaign.daily_cap = campaign.daily_cap.split("|").map(function(e){
  //   return parseInt(e);
  // });
  
  // if(campaign.daily_cap.length === 1){
  //   campaign.daily_cap.push(campaign.daily_cap[0]);
  // }
  
  // let options = sheet.getRange("S15:U15").getValues();
  // campaign.options = {};
  // campaign.options.obTag = options[0][0] === 'x' ? options[0][2] : false;
  
  // Logger.log(campaign);
  return campaign;
}

// determine native BrandingText by site
function getBrandingText(site){
  switch(site){
    case 'sportschew':
      return 'SportsChew';
    case 'blitzlift':
      return 'BlitzLift';
    case 'dogsome':
      return 'Dogsome';
    case 'insidetonight':
      return 'InsideTonight';
    case 'popularhealth':
      return 'PopularHealth';
    case 'hopeshared':
      return 'HopeShared';
    default:
      return 'SITE NOT FOUND'
  }
}

const createCampaignName = (campaignData) => {
  const site = determineSiteInitials(campaignData.site)
  const type = determineCampaignTypeString(campaignData)
  const device = campaignData.device === "desktop" ? "Desktop" : "Mobile"
  const campaign = campaignData.campaign_name

  return site + ' - ' + campaign + ' - ' + type + device;
}

module.exports = {
  createCampaignName
  createCampaignUTM,
  createItemArray,
  getBrandingText,
  createTrackingCode,
  createCampaignArray
}