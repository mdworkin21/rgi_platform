import regeneratorRuntime, {async} from "regenerator-runtime";
import axios from 'axios'
import {getBids, getCountries, addCountry, addBid } from '../../actions/campaigns/campaignConfiguration'

//Thunks

// Bids 
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

export const addPublisher = (publisher_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('api/dataIngestion/dataPipeline/addBid', {publisher_id})
      const newBid = response.data
      const action = addBid(newBid)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}


// Country
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


export const addSingleCountry = (country) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('api/dataIngestion/dataPipeline/addCountry', country)
      const newCountry = response.data
      const action = addCountry(newCountry)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}