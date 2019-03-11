import { GET_ALL_USERS, UPDATE_USER_PERMISSIONS, DELETE_USER } from "../actions/admin";


const initialState = {
  users: []
}
export default function adminReducer(state = initialState, action){
  switch(action.type){
    case GET_ALL_USERS:
      return {...state, users: action.users}
    case UPDATE_USER_PERMISSIONS:
      let updatedUsers = state.users.map(user =>{
        if (user.id === action.user.id){
          user = action.user
          return user
        } else {
          return user
        }
      })
      return {...state, users: updatedUsers}
    case DELETE_USER:
      let fileteredUser = state.users.filter(user => user.id !== action.id)
      return {...state, users: fileteredUser}
    default: 
      return state
  }
}