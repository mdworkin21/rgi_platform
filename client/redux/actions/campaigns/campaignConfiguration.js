import { GET_CAMPAIGN } from "./taboola"

//Action Types

export const SAVE_CAMPAIGN_SETTINGS = 'SAVE_CAMPAIGN_SETTINGS'
export const CLEAR_CAMPAIGN_SETTINGS = 'CLEAR_CAMPAIGN_SETTINGS'
export const SUBMIT_CAMPAIGN_SETTINGS = 'SUBMIT_CAMPAIGN_SETTINGS'
export const GET_CAMPAIGN_SETTINGS = 'GET_CAMPAIGN_SETTINGS'
export const SAVE_HEADLINES = 'SAVE_HEADLINES'
export const CLEAR_HEADLINES = 'CLEAR_HEADLINES'
export const DELETE_HEADLINE = 'DELETE_HEADLINE'

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

export const saveHeadlines = (headlines) => {
  return {
    type: SAVE_HEADLINES,
    headlines
  }
}

export const clearHeadlines = () => {
  return {
    type: CLEAR_HEADLINES
  }
}

export const deleteHeadline = (headline) => {
  console.log("ACT", headline)
  return {
    type: DELETE_HEADLINE,
    headline
  }
}


