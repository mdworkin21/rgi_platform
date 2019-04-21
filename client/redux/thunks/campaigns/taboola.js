import regeneratorRuntime, {async} from "regenerator-runtime";
import axios from 'axios'
import {createCampaign, getCampaign, deleteCampaign, editCampaign} from '../../actions/campaigns/taboola'

//Thunks
export const createNewCampaign = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('api/campaignManagement/taboola/createCampaign', 'TEST')
      const campaignName = response.data
      const action = createCampaign(campaignName)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}