import {GET_USER_FAIL, CLOSE_MODAL, SIGNUP_ERR} from '../actions/applicationLevel'

const initialState = {
  logInErr: false,
  loggedIn: false,
  errMsg: ''
}

export default function applicationLevelReducer(state = initialState, action){
  switch(action.type){
    case GET_USER_FAIL:
      return {...state,  logInErr: true, errMsg: action.err}
    case CLOSE_MODAL: 
      return {...state, logInErr: false}
    case SIGNUP_ERR:
      return {...state, logInErr: true, errMsg: action.err}
    default:
      return state
  }
}