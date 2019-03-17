import { GET_ALL_USERS, UPDATE_USER_PERMISSIONS, DELETE_SINGLE_USER } from "../actions/admin";


const initialState = {
  admins: []
}
export default function adminReducer(state = initialState, action){
  switch(action.type){
    case GET_ALL_USERS:
      return {...state, admins: action.users}
    case UPDATE_USER_PERMISSIONS:
      let updatedUsers = state.admins.map(user =>{
        if (user.id === action.user.id){
          user = action.user
          return user
        } else {
          return user
        }
      })
      return {...state, admins: updatedUsers}
    case DELETE_SINGLE_USER:
      let fileteredUser = state.admins.filter(user => user.id !== action.id)
      return {...state, admins: fileteredUser}
    default: 
      return state
  }
}