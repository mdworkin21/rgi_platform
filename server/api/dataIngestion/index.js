const router = require('express').Router()
const {db, User} = require('../../db/models')

//NOT DRY, Using this check elsewhere, maybe put all security checks in a util folder and then require in
const loggedInCheck = async (req, res, next) => {
  try{

    //Checks for someone logged in through UI
    if (req.session.passport){
      let userIsLoggedIn = await User.findOne({
        where: {
          id: req.session.passport.user
        }
      })

      if (userIsLoggedIn){
        next()
      } 
    }

    //Allows for non-ui API requests, helps with seeding data, etc
    if (req.query.token === process.env.ADMIN_TOKEN){
      next()
    }

  } catch(err){
    res.sendStatus(401, err)
  }
}


//Granular Routes
router.use('/uploadData', loggedInCheck, require('./uploadData'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;