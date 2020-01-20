export const createCampaignArray = (data) => {
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
      daily_cap: data[`daily_cap_${type[1]}`]
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


export const determineSiteName = (siteName) => {
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

export const determineType = (campaignData) => {
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

export const createCampaignName = (campaignData) => {
  const site = determineSiteName(campaignData.site)
  const type = determineType(campaignData)
  const device = campaignData.device === "desktop" ? "Desktop" : "Mobile"
  const campaign = campaignData.campaign_name

  return site + ' - ' + campaign + ' - ' + type + device;
}


