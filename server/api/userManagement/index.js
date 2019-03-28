const router = require('express').Router()
const {db, User} = require('../../db/models')

//Security Checks
const adminCheck = async (req, res, next) => {
  try{
    let userIsAdmin = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    if (userIsAdmin.isAdmin){
      next()
    }
  } catch(err){
    res.sendStatus(401)
  }
}

const loggedInCheck = async (req, res, next) => {
  try{
    let userIsLoggedIn = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    if (userIsLoggedIn){
      next()
    }
  } catch(err){
    res.sendStatus(401)
  }
}

//Granular Routes
router.use('/admin', adminCheck, require('./admin'))
router.use('/user', loggedInCheck, require('./user') )

//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;