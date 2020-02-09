const campaignValidator = (obj) => {
  let errors = []
  let keys = Object.keys(obj)

  // check for campaigns name
  if(obj.campaign_name === ''){
    errors.push("Must enter campaign name")
  }

  // check for url
  if(obj.url === ''){
    errors.push("Must enter URL")
  }

  // if ob tag enabled, check for entry
  if(obj.ob_tag_enabled && obj.ob_tag === ''){
    errors.push("Must add outbrain tag if enabled")
  }

  // create array of types, check if any are selected
  let types = keys.filter(e => e.startsWith('type_') && obj[e])
  if(!types.length){
    errors.push("Must select at least one campaign type")
  }

  // create platform-specific array of types
  let taboolaTypes = keys.filter(e => e.startsWith('type_taboola') && obj[e])
  let outbrainTypes = keys.filter(e => e.startsWith('type_outbrain') && obj[e])

  // check if daily cap entered for selected campaigns
  if(taboolaTypes.length && obj.daily_cap_taboola === ''){
    errors.push("Must add daily_cap for 'taboola'")
  }
  if(outbrainTypes.length && obj.daily_cap_outbrain === ''){
    errors.push("Must add daily_cap for 'outbrain'")
  }

  let taboolaDesktopTypes = keys.filter(e => e.startsWith('type_taboola_desktop') && obj[e])
  let outbrainDesktopTypes = keys.filter(e => e.startsWith('type_outbrain_desktop') && obj[e])
  let taboolaMobileTypes = keys.filter(e => e.startsWith('type_taboola_mobile') && obj[e])
  let outbrainMobileTypes = keys.filter(e => e.startsWith('type_outbrain_mobile') && obj[e])

  // ensure cpc is filled out for corresponding type
  if(taboolaDesktopTypes.length && !cpc_taboola_desktop){
    errors.push("Must add desktop cpc for 'taboola'")
  }
  if(taboolaMobileTypes.length && !cpc_taboola_mobile){
    errors.push("Must add mobile cpc for 'taboola'")
  }
  if(outbrainDesktopTypes.length && !cpc_outbrain_desktop){
    errors.push("Must add desktop cpc for 'outbrain'")
  }
  if(outbrainMobileTypes.length && !cpc_outbrain_mobile){
    errors.push("Must add mobile cpc for 'outbrain'")
  }

  
}

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