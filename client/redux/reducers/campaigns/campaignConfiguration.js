import {SAVE_CAMPAIGN_SETTINGS, CLEAR_CAMPAIGN_SETTINGS, SUBMIT_CAMPAIGN_SETTINGS, GET_CAMPAIGN_SETTINGS, SAVE_HEADLINES, CLEAR_HEADLINES, DELETE_HEADLINE, CLEAR_IMAGES, DELETE_IMAGE, SAVE_IMAGES, SAVE_BLOCKS, CLEAR_BLOCKS, DELETE_BLOCK } from '../../actions/campaigns/campaignConfiguration'


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
  blocks: [{publisher_id: '', country: ''}]
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
    case SAVE_BLOCKS:
      return {...state, blocks: [...blocks, action.blocks]}
    case CLEAR_BLOCKS:
      return {...state, blocks: initialState.blocks}
    case DELETE_BLOCK:
      let blocks =  state.blocks.filter((el, i) => {
        return i !== action.block })

        if (blocks.length === 0){
          return {...state, blocks: initialState.blocks}
        } else {
          return {...state, block: blocks}
        }
    default: 
      return state
  }
}