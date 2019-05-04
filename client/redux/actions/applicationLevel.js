//ACTION TYPES
export const GET_USER_FAIL= 'GET_USER_FAIL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SIGNUP_ERR = 'SIGNUP_ERR'

//ACTION CREATORS

export const failedLogIn = (err) => {
  return {
    type: GET_USER_FAIL,
    err
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

