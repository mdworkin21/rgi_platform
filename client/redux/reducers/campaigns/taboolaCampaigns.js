import {CREATE_NEW_CAMPAIGN, GET_CAMPAIGN, DELETE_CAMPAIGN, EDIT_CAMPAIGN} from '../../actions/campaigns/taboola'



const initialState = {
  campaignName: '',
  campaignID: ''
}


export default function TaboolaCampaignReducer(state = initialState, action){
  switch(action.type){
    case CREATE_NEW_CAMPAIGN:
      return {...state, campaignID: action.name}
    default:
      return state
  }
}