//USER ACTION TYPES
export const GET_USER = 'GET_USER'
export const GET_USER_FAIL= 'GET_USER_FAIL'
export const NEW_USER = 'NEW_USER'
export const DELETE_USER = 'DELETE_USER'

//USER ACTION CREATORS
export const newUser = (user) => {
  return {
    type: NEW_USER,
    user
  }
}

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

