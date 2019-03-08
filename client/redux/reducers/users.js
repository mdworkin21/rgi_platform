import {GET_USER, NEW_USER, DELETE_USER,  GET_USER_FAIL} from '../actions/users'

const initialState = {
  user: {},
  logInErr: false
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.user}
    case GET_USER_FAIL:
      return {...state,  logInErr: true}
    case DELETE_USER: 
      return {...state, user: {} }
    default:
      return state
  }
 }