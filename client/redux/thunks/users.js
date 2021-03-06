import regeneratorRuntime, {async} from "regenerator-runtime"
import axios from 'axios'
import { getUser, deleteUser, updateUser} from '../actions/users'
import {failedLogIn, signUpErr} from '../actions/applicationLevel'
import {errMessages} from '../../utilities/errMessages'

//USER THUNK
export const getUserFromPassport = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`/authenticate/getUser`)
      const user = response.data
      const action = getUser(user)
      dispatch(action)
    }catch(err){
      console.log(err)
    }
  }
}

export const logInUser = (user) => {
  return async (dispatch) => {
    try{
      const loggedInUser = await axios.post('/authenticate/login', {user})
      if (loggedInUser.status === 200){
        const userIsIn = loggedInUser.data
        const action = getUser(userIsIn)
        dispatch(action)
      } 
    } catch(err){
        const errCode = err.toString().slice(-3)
        const errMsg = errMessages.login[errCode]
        dispatch(failedLogIn(errMsg))
        console.log(err)
    }
  }
}

export const updateUserInfo = (id, userInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/userManagement/user/${id}`, userInfo)
      const updatedUser = response.data
      const action = updateUser(updatedUser)
      dispatch(action)
    } catch(err){
       console.log(err)
    }
  }
}


export const removeUser = () => {
  return async (dispatch) => {
    try{
      await axios.delete('/authenticate/logout')
      const action = (deleteUser())
      dispatch(action)
    }catch(err){
      console.log(err)
    } 
  }
} 