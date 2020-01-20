const router = require('express').Router()
const User = require('../db/models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Req.user is populated by Passport.js 
//This checks to see if user exists and has an active session.
router.get('/getUser', (req, res, next) => {
  try{ 
    if (req.user){ 
      res.status(200).send(req.user)
    }
  } catch(e){ next(e)}
})

router.post('/login', async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: {
        email: req.body.user.email
      }
    }) 
    if(!user){
      res.sendStatus(401)
    } else if (!user.checkPassword(req.body.user.password)) {
      res.sendStatus(401)
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch(err){
      next(err)
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

