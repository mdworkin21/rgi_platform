import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import { getUser, deleteUser, failedLogIn, failedSignUp} from '../actions/users'

//USER THUNK

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
        const newUser = response.data
        const action = getUser(newUser)
        dispatch(action)
      }
    } catch(err){
        //I'd prefer not to use an alert here, need to change for future, okay for now.
        alert(`SORRY, username or password already taken, please try again. ERRRR ${err}`)
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
        dispatch(failedLogIn())
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