import regeneratorRuntime, {async} from "regenerator-runtime";
import axios from 'axios'
import {getBids, getCountries} from '../../actions/campaigns/campaignConfiguration'

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

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/dataIngestion/dataPipeline/getCountries')
      const countries = response.data
      const action = getCountries(countries)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}