import {SAVE_CAMPAIGN_SETTINGS, CLEAR_CAMPAIGN_SETTINGS, SUBMIT_CAMPAIGN_SETTINGS, GET_CAMPAIGN_SETTINGS, SAVE_HEADLINES, CLEAR_HEADLINES, DELETE_HEADLINE, CLEAR_IMAGES, DELETE_IMAGE, SAVE_IMAGES} from '../../actions/campaigns/campaignConfiguration'


const initialState = {
  campaignConfig:{
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
    type_outbrain_mobile_premium: false,
    content: false,
    search: false,
    country: 'Select Country'
  },
  headlines: [{counter: 0, value: ''}],
  images: []
}

export default function campaignConfigurationReducer(state = initialState, action){
  switch(action.type){
    case SAVE_CAMPAIGN_SETTINGS:
      return {...state, campaignConfig: action.campaignConfig}
    case CLEAR_CAMPAIGN_SETTINGS: 
      return {...state, campaignConfig: initialState.campaignConfig}
    case SUBMIT_CAMPAIGN_SETTINGS:
      return initialState
    case GET_CAMPAIGN_SETTINGS:
      return action.campaignID
    case SAVE_HEADLINES:
      return {...state, headlines: action.headlines}
    case CLEAR_HEADLINES:
      return {...state, headlines: initialState.headlines}
    case DELETE_HEADLINE:
      let headlines =  state.headlines.filter((el) => {
        return el.counter !== action.headline })

        if (headlines.length === 0){
          return {...state, headlines: initialState.headlines}
        } else {
          return {...state, headlines: headlines}
        }
    case SAVE_IMAGES:
      return {...state, images: action.images}
    case CLEAR_IMAGES:
      return {...state, images: initialState.images}
    case DELETE_IMAGE:
      let images =  state.images.filter((el, i) => {
        return i !== action.image })

        if (images.length === 0){
          return {...state, images: initialState.images}
        } else {
          return {...state, images: images}
        }
    default: 
      return state
  }
}