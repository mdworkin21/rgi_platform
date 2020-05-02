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
export const ADD_BID = 'ADD_BID'
export const SAVE_BIDS = 'SAVE_BIDS'
export const CLEAR_BIDS = 'CLEAR_BIDS'
export const DELETE_BID = 'DELETE_BID'
export const GET_BIDS = 'GET_BIDS'
export const CREATE_BID = 'CREATE_BID'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const DELETE_COUNTRY = 'DELETE_COUNTRY'
export const UPDATE_COUNTRY_IN_BID = 'UPDATE_COUNTRY_IN_BID'


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

export const addBid = (bid) => {
  return {
    type: ADD_BID,
    bid
  }
}

export const saveBids = (bids) => {
  return {
    type: SAVE_BIDS,
    bids
  }
}

export const clearBids = () => {
  return {
    type: CLEAR_BIDS
  }
}

export const getBids = (bids) => {
  return {
    type: GET_BIDS,
    bids
  }
}

export const createBid = (bid) => {
  return {
    type: CREATE_BID,
    bid
  }
}

export const deleteBid = (bid) => {
  return {
    type: DELETE_BID,
    bid
  }
}

export const updateCountryInBid = (bid) => {
  return {
    type: UPDATE_COUNTRY_IN_BID,
    bid
  }
}

export const getCountries = (countries) => {
  return {
    type: GET_COUNTRIES,
    countries
  }
}

export const addCountry = (country) => {
  return {
    type: ADD_COUNTRY,
    country
  }
}

export const deleteDelete = (country) => {
  return {
    type: DELETE_COUNTRY,
    country
  }
}

