import {GET_USER, DELETE_USER,  GET_USER_FAIL, CLOSE_MODAL} from '../actions/users'

const initialState = {
  user: {},
  logInErr: false,
  loggedIn: false,
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.user, loggedIn: true }
    case GET_USER_FAIL:
      return {...state,  logInErr: true}
    case DELETE_USER: 
      return {...state, user: {}, loggedIn: false}
    case CLOSE_MODAL: {
      return {...state, logInErr: false}
    }
    default:
      return state
  }
 }

 