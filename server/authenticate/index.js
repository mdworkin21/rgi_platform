const router = require('express').Router()
const User = require('../db/models/User')
const SignupToken = require('../db/models/SignupTokens')

//Custom Middleware
let checkSignUpCode = async (req, res, next) => {
  try{
    let signupIsValid = await SignupToken.findOne({
      where: {
        email: req.body.email
      }
    })
    if(!signupIsValid){
      res.status(401).send('Email does not exist')
    } else if (!signupIsValid.checkSignupCode(req.body.token)) {
      res.status(401).send('Signup code is invalid')
    } else {
        if(signupIsValid.role === 'admin'){
          req.body.isAdmin = true
        }
      next()
    }
  } catch(err){
      console.log('ERRR', err)
      next(err)
  }
}

router.get('/', async (req, res, next)=> {
  try{
    let user = await User.findOne({
      where: {
        id: req.session.password.user
      }
    })
    res.status(200).send(user)

  } catch(err){
    next(err)
  }
})
//Checks to see if user exists in db, and whether pw is correct. 
router.get('/getUser/:id', (req, res, next) => {
  if (req.user){
    res.status(200).send(req.user)
  }
})

router.post('/checkUser', async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: {
        userName: req.body.user.userName
      }
    }) 
    if(!user){
      res.status(401).send('Wrong username and/or password')
    } else if (!user.checkPassword(req.body.user.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch(err){
      next(err)
  }
})

router.post('/newUser', checkSignUpCode, async (req, res, next) => {
  try{
    const newUser = await User.create(req.body)
    req.login(newUser, err => (err ? next(err) : res.status(201).send(newUser)))
  }catch(err){
    if (err.name === 'SequelizeUniqueConstraintError'){
      let errMsg = err.errors[0].message
      //For some reason errMsg doesn't actually get sent, so I have a work around for now
      res.status(401).send(errMsg)
    } else {
        next(err)
    }
  }
})

router.delete('/logout', async(req, res, next) => {
  try{
    req.logOut()
    req.session.destroy()
    res.sendStatus(202)
  }catch(err){
    next(err)
  }
})


module.exports = router 

