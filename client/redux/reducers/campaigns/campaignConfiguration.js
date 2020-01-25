import {SAVE_CAMPAIGN_SETTINGS, CLEAR_CAMPAIGN_SETTINGS, SUBMIT_CAMPAIGN_SETTINGS, GET_CAMPAIGN_SETTINGS} from '../../actions/campaigns/campaignConfiguration'


const initialState = {
  campaignConfiguration: {}
}

export default function campaignConfigurationReducer(state = initialState, action){
  switch(action.type){
    case SAVE_CAMPAIGN_SETTINGS:
      return {campaignConfiguration: action.campaignConfig}
    case CLEAR_CAMPAIGN_SETTINGS: {
      return {campaignConfiguration: {}}
    }
    case SUBMIT_CAMPAIGN_SETTINGS:
      return {campaignConfiguration: {}}
    case GET_CAMPAIGN_SETTINGS:
      return { campaignConfiguration: action.campaignID}
    default: 
      return state
  }
}