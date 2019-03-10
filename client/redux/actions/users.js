//USER ACTION TYPES
export const GET_USER = 'GET_USER'
export const GET_USER_FAIL= 'GET_USER_FAIL'
export const DELETE_USER = 'DELETE_USER'

//USER ACTION CREATORS
//Note: getUser takes care of login *and* signup
export const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const failedLogIn = () => {
  return {
    type: GET_USER_FAIL
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  }
}

