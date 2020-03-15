import { GET_CAMPAIGN } from "./taboola"

//Action Types
export const SAVE_CAMPAIGN_SETTINGS = 'SAVE_CAMPAIGN_SETTINGS'
export const CLEAR_CAMPAIGN_SETTINGS = 'CLEAR_CAMPAIGN_SETTINGS'
export const SUBMIT_CAMPAIGN_SETTINGS = 'SUBMIT_CAMPAIGN_SETTINGS'
export const GET_CAMPAIGN_SETTINGS = 'GET_CAMPAIGN_SETTINGS'
export const SAVE_HEADLINES = 'SAVE_HEADLINES'
export const CLEAR_HEADLINES = 'CLEAR_HEADLINES'
export const DELETE_HEADLINE = 'DELETE_HEADLINE'
export const SAVE_IMAGES = 'SAVE_IMAGES'
export const CLEAR_IMAGES = 'CLEAR_IMAGES'
export const DELETE_IMAGE = 'DELETE_IMAGE'
export const SAVE_BLOCKS = 'SAVE_BLOCKS'
export const CLEAR_BLOCKS = 'CLEAR_BLOCKS'
export const DELETE_BLOCK = 'DELETE_BLOCK'

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
  return {
    type: DELETE_HEADLINE,
    headline
  }
}

export const saveImages = (images) => {
  return {
    type: SAVE_IMAGES,
    images
  }
}

export const clearImages = () => {
  return {
    type: CLEAR_IMAGES
  }
}

export const deleteImage = (image) => {
  return {
    type: DELETE_IMAGE,
    image
  }
}

export const saveBlocks = (blocks) => {
  return {
    type: SAVE_BLOCKS,
    blocks
  }
}

export const clearBlocks = () => {
  return {
    type: CLEAR_BLOCKS
  }
}

export const deleteBlock = (block) => {
  return {
    type: DELETE_BLOCKS,
    block
  }
}


