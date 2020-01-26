import {SAVE_CAMPAIGN_SETTINGS, CLEAR_CAMPAIGN_SETTINGS, SUBMIT_CAMPAIGN_SETTINGS, GET_CAMPAIGN_SETTINGS} from '../../actions/campaigns/campaignConfiguration'


const initialState = {
  campaign_name: '',
  url: '',
  ob_tag: '',
  cpc_taboola_desktop: '',
  cpc_taboola_mobile: '',
  cpc_outbrain_desktop: '',
  cpc_outbrain_mobile: '',
  daily_cap_taboola: '',
  daily_cap_outbrain: '',
  ob_tag_enabled: false,
  type_taboola_desktop: false,
  type_taboola_mobile: false,
  type_taboola_desktop_safe: false,
  type_taboola_mobile_safe: false,
  type_outbrain_desktop: false,
  type_outbrain_mobile: false, 
  type_outbrain_desktop_msn: false,
  type_outbrain_desktop_premium: false,
  type_outbrain_mobile_premium: false
}

export default function campaignConfigurationReducer(state = initialState, action){
  switch(action.type){
    case SAVE_CAMPAIGN_SETTINGS:
      return action.campaignConfig
    case CLEAR_CAMPAIGN_SETTINGS: 
      return initialState
    case SUBMIT_CAMPAIGN_SETTINGS:
      return initialState
    case GET_CAMPAIGN_SETTINGS:
      return action.campaignID
    default: 
      return state
  }
}