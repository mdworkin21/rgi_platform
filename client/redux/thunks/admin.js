import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import { getUsers, deleteUser, updatePermissions} from '../actions/admin'
import store from '../store'


//ADMIN THUNKS
export const getAllUsers = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('api/userManagement/admin/getUsers/')
      const users = response.data
      const action = getUsers(users)
      dispatch(action)
    }catch(err){
      console.log(err)
    }
  }
}

export const updateUserPermissions = (id, bool) => {
  return async (dispatch) => {
    try{
    const updated = await axios.put(`api/userManagement/admin/updateAdminPriv/${id}/${bool}`)
    if (updated.status === 202){
      const action = updatePermissions(updated.data)
      dispatch(action)
    }
  } catch(err){
      console.log(err)
    }
  }
}

export const deleteSingleUser = (id) => {
  return async (dispatch) => {
    try{
      const deleted = await axios.delete(`api/userManagement/admin/deleteUser/${id}`
      )
      if (deleted.status === 200){
        const action = deleteUser(id)
        dispatch(action)
      } else {
        alert('Sorry, there was an error, please try again.')
      }
    }catch(err){
      console.log(err)
    }
  }
}