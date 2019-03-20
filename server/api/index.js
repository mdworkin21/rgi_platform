const router = require('express').Router();
const {db, User} = require('../db/models')

//Protect Routes Middleware
const adminCheck = async (req, res, next) => {
  try{
    let userIsAdmin = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    if (userIsAdmin.isAdmin){
      next()
    } else {
      res.sendStatus(404)
    }
  } catch(err){
    next(err)
  }
}

//API Routes 
router.use('/userManagement', require('./userManagement'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;