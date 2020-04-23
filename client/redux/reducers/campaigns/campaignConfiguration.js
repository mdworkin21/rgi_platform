import {SAVE_CAMPAIGN_SETTINGS, CLEAR_CAMPAIGN_SETTINGS, SUBMIT_CAMPAIGN_SETTINGS, GET_CAMPAIGN_SETTINGS, SAVE_HEADLINES, CLEAR_HEADLINES, DELETE_HEADLINE, CLEAR_IMAGES, DELETE_IMAGE, SAVE_IMAGES, SAVE_BIDS, CLEAR_BIDS, DELETE_BID, GET_BIDS, GET_COUNTRIES, UPDATE_COUNTRY_IN_BID } from '../../actions/campaigns/campaignConfiguration'


const initialState = {
  campaignConfig:{
    // General
    campaign_name: '',
    url: '',
    branding_text: '',
    media_buyer: '',
    content: false,
    search: false,
    country: 'Select Country',
    selectedOption: '',
    // Taboola
    cpc_taboola_desktop: '',
    cpc_taboola_tablet: '',
    cpc_taboola_mobile: '',
    type_taboola_desktop: false,
    type_taboola_tablet: false,
    type_taboola_mobile: false,
    type_taboola_desktop_safe: false,
    type_taboola_tablet_safe: false,
    type_taboola_mobile_safe: false,
    taboola_account: '',
    daily_cap_taboola: '',
    //Outbrain
    daily_cap_outbrain: '',
    cpc_outbrain_desktop: '',
    cpc_outbrain_tablet: '',
    cpc_outbrain_mobile: '',
    ob_tag: '',
    ob_tag_enabled: false,
    type_outbrain_desktop: false,
    type_outbrain_mobile: false, 
    type_outbrain_tablet: false,
    type_outbrain_tablet_premium: false,
    type_outbrain_desktop_msn: false,
    type_outbrain_desktop_premium: false,
    type_outbrain_mobile_premium: false
  },
  headlines: [{counter: 0, value: ''}],
  images: [],
  bids: [{publisher_id: '', country: '', blocks: 0, enabled: false}],
  countries: [{country: 'All', }]
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
    case SAVE_BIDS:
      return {...state, bids: [...bids, action.bids]}
    case CLEAR_BIDS:
      return {...state, bids: initialState.bids}
    case DELETE_BID:
      let bids =  state.bids.filter((el, i) => {
        return i !== action.bid })

        if (bids.length === 0){
          return {...state, bids: initialState.bids}
        } else {
          return {...state, bid: bids}
        }
    case UPDATE_COUNTRY_IN_BID:
      let updatedBid = state.bids.map(el => {
        if (el.publisher_id === action.bid.publisher_id){
          el = action.bid
        }
        return el
      })
      return {...state, bids: updatedBid}
      
    case GET_BIDS:
      return {...state, bids: action.bids}
    case GET_COUNTRIES:
      return {...state, countries: action.countries}
    default: 
      return state
  }
}