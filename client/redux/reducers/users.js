import {GET_USER, NEW_USER, DELETE_USER,  GET_USER_FAIL} from '../actions/users'

const initialState = {
  user: {},
  logInErr: false,
  loggedIn: false
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.user, loggedIn: true}
    case GET_USER_FAIL:
      return {...state,  logInErr: true}
    case DELETE_USER: 
      return {...state, user: {}, loggedIn: false}
    default:
      return state
  }
 }