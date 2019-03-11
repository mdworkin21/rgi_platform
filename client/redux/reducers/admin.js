import { GET_ALL_USERS, UPDATE_USER_PERMISSIONS } from "../actions/admin";


const initialState = {
  users: []
}
export default function adminReducer(state = initialState, action){
  switch(action.type){
    case GET_ALL_USERS:
      return {...state, users: action.users}
    // case UPDATE_USER_PERMISSIONS:
    //   //will need to filter in some way
    //   return {stat}
    default: 
      return state
  }
}