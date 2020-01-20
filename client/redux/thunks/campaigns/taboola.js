import regeneratorRuntime, {async} from "regenerator-runtime";
import axios from 'axios'
import {createTaboolaCampaign, getCampaign, deleteCampaign, editCampaign} from '../../actions/campaigns/taboola'

//Thunks
export const createNewTabCampaign = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('api/campaignManagement/processCampaignQueue/createCampaign')
      const campaignName = response.data
      const action = createTaboolaCampaign(campaignName)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}