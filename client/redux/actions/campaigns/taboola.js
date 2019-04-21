//Action Types

export const CREATE_NEW_CAMPAIGN = 'CREATE_NEW_CAMPAIGN'
export const GET_CAMPAIGN = 'GET_CAMPAIGN'
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'
export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN'


//Action Creators
//Not sure if this has payload or what it should be, ask mike
//Payloads probably need to change for rest as well
export const createCampaign = (name) => {
  return {
    type: CREATE_NEW_CAMPAIGN,
    name

  }
}

export const getCampaign = (pk) => {
  return {
    type: GET_CAMPAIGN,
    pk
  }
}

export const deleteCampaign = (pk) => {
  return {
    type: DELETE_CAMPAIGN,
    pk
  }
}

export const editCampaign = (pk) => {
  return {
    type: EDIT_CAMPAIGN,
    pk
  }
}