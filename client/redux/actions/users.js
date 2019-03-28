//USER ACTION TYPES
export const GET_USER = 'GET_USER'
export const GET_USER_FAIL= 'GET_USER_FAIL'
export const DELETE_USER = 'DELETE_USER'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SIGNUP_ERR = 'SIGNUP_ERR'
export const UPDATE_USER = 'UPDATE_USER'
//USER ACTION CREATORS
//Note: getUser takes care of login *and* signup
//Note: This should be refactored so that errs are in own reducer

export const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const failedLogIn = (err) => {
  return {
    type: GET_USER_FAIL,
    err
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

export const signUpErr = (err) => {
  return {
    type: SIGNUP_ERR,
    err
  }
}

export const updateUser = (userInfo) => {
  return {
    type: UPDATE_USER,
    userInfo
  }
}