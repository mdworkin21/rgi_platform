import regeneratorRuntime, {async} from "regenerator-runtime";
import axios from 'axios'
import {getBids} from '../../actions/campaigns/campaignConfiguration'

//Thunks
export const getAllBids = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/dataIngestion/dataPipeline/getBids')
      const bids = response.data
      const action = getBids(bids)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}