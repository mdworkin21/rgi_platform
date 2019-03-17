//Action Types
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const UPDATE_USER_PERMISSIONS = 'UPDATE_USER_PERMISSIONS'
export const DELETE_SINGLE_USER = 'DELETE_SINGLE_USER'

//Action Creators
export const getUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const updatePermissions = (user) => {
  return {
    type: UPDATE_USER_PERMISSIONS,
    user
  }
}

export const deleteUser = (id) => {
  return {
    type: DELETE_SINGLE_USER,
    id
  }
}