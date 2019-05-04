//USER ACTION TYPES
export const GET_USER = 'GET_USER'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_USER = 'UPDATE_USER'

//USER ACTION CREATORS
//Note: getUser takes care of login *and* signup
export const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  }
}

export const updateUser = (userInfo) => {
  return {
    type: UPDATE_USER,
    userInfo
  }
}