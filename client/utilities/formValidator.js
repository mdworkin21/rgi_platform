const formValidator = (obj, key) => {
  if (key === "email"){
      return obj[key].includes('@')
  } else if (key === "password"){
      return obj[key].length >= 8
  } else if (key === "repassword"){
      return obj[key] === obj["password"]
  } 
}

const checkEachField = (validatorFunc, obj) => {
  let invalidEntries = []
  let relevantFields = {}

  for (let key in obj){
    if (key === 'email' || key === 'password' || key === 'repassword'){
      relevantFields[key] = obj[key]
    } 
  }
  for (let key in relevantFields){
    if (!validatorFunc(obj, key) && key !== 'formErrs'){
      invalidEntries.push(key)
    }
  }
  return invalidEntries
}

const individualizedErrMsg = (errorsArray) => {
  let messages = []
  const messageObj = {
    email: 'A valid email is required.', 
    password: 'Password must be at least eight characters.',
    repassword: 'Re-entered password does not match password.',
  }
  for (let i = 0; i < errorsArray.length; i++){
    messages.push(messageObj[errorsArray[i]])
  }
  return messages
}

const comparePasswords = (password, retypedPassword) => {
  return password === retypedPassword
}

module.exports = {
  formValidator,
  checkEachField,
  individualizedErrMsg,
  comparePasswords
}