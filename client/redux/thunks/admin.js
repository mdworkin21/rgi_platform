import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import { getUsers} from '../actions/admin'


//ADMIN THUNKS
export const getAllUsers = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('api/userManagement/admin/getUsers')
      const users = response.data
      const action = getUsers(users)
      dispatch(action)
    }catch(err){
      console.log(err)
    }
  }
}