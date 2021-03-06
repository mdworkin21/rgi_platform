import {CREATE_NEW_TABOOLA_CAMPAIGN, GET_CAMPAIGN, DELETE_CAMPAIGN, EDIT_CAMPAIGN} from '../../actions/campaigns/taboola'

const initialState = {
  campaignName: '',
  campaignID: ''
}


export default function taboolaCampaignReducer(state = initialState, action){
  switch(action.type){
    case CREATE_NEW_TABOOLA_CAMPAIGN:
      return {...state, campaignID: action.name}
    default:
      return state
  }
}