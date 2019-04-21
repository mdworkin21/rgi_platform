import regeneratorRuntime, {async} from "regenerator-runtime"
import axios from 'axios'
import { getUser, deleteUser, failedLogIn, signUpErr, updateUser} from '../actions/users'
import {errMessages} from '../../utilities/errMessages'

//USER THUNK
export const getUserFromPassport = (id) => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`/authenticate/getUser/${id}`)
      const user = response.data
      const action = getUser(user)
      dispatch(action)
    }catch(err){
      console.log(err)
    }
  }
}

export const createNewUser = (user) => {
  return async(dispatch) => {
    try{
      const response = await axios.post('/authenticate/newUser', {
        userName: user.userName,
        email: user.email,
        password: user.password,
        token: user.token
      })    
      if (response.status === 201){
        dispatch(getUserFromPassport(response.data.id))
      }
    } catch(err){
        const errCode = err.toString().slice(-3)
        const errMsg = errMessages.newUser[errCode]
        dispatch(signUpErr(errMsg))
        console.log(err)
    }
  }
}

export const logInUser = (user) => {
  return async (dispatch) => {
    try{
      const loggedInUser = await axios.post('/authenticate/checkUser', {user})
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