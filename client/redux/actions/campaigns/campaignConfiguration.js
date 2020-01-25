import { GET_CAMPAIGN } from "./taboola"

//Action Types

export const SAVE_CAMPAIGN_SETTINGS = 'SAVE_CAMPAIGN_SETTINGS'
export const CLEAR_CAMPAIGN_SETTINGS = 'CLEAR_CAMPAIGN_SETTINGS'
export const SUBMIT_CAMPAIGN_SETTINGS = 'SUBMIT_CAMPAIGN_SETTINGS'
export const GET_CAMPAIGN_SETTINGS = 'GET_CAMPAIGN_SETTINGS'


//Action Creators
export const saveCampaignSettings = (campaignConfig) => {
  return {
    type: SAVE_CAMPAIGN_SETTINGS,
    campaignConfig
  }
}

export const clearCampaignSettings = () => {
  return {
    type: CLEAR_CAMPAIGN_SETTINGS
  }
}

export const submitCampaignSettings = (campaignConfig) => {
  return {
    type: SUBMIT_CAMPAIGN_SETTINGS,
    campaignConfig
  }
}

export const getCampaignSettings = (campaignID) => {
  return {
    type: GET_CAMPAIGN_SETTINGS,
    campaignID
  }
}