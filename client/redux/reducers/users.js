import {GET_USER, DELETE_USER,  GET_USER_FAIL, CLOSE_MODAL, SIGNUP_ERR, UPDATE_USER} from '../actions/users'

const initialState = {
  user: {},
  logInErr: false,
  loggedIn: false,
  errMsg: ''
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.user, loggedIn: true }
    case GET_USER_FAIL:
      return {...state,  logInErr: true, errMsg: action.err}
    case DELETE_USER: 
      return {...state, user: {}, loggedIn: false}
    case UPDATE_USER:
      return {...state, user: action.userInfo}
    case CLOSE_MODAL: 
      return {...state, logInErr: false}
    case SIGNUP_ERR:
      return {...state, logInErr: true, errMsg: action.err}
    default:
      return state
  }
 }

 