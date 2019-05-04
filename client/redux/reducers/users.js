import {GET_USER, DELETE_USER, UPDATE_USER} from '../actions/users'

const initialState = {
  user: {},
  loggedIn: false
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.user, loggedIn: true }
    case DELETE_USER: 
      return {...state, user: {}, loggedIn: false}
    case UPDATE_USER:
      return {...state, user: action.userInfo}
    default:
      return state
  }
 }

 