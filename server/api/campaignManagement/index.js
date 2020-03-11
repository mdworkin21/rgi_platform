const router = require('express').Router()
const {db, User} = require('../../db/models')

//NOT DRY, Using this check elsewhere, maybe put all security checks in a util folder and then require in


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
router.use('/processCampaignQueue', loggedInCheck, require('./processCampaignQueue'))
router.use('/outbrain', loggedInCheck, require('./outbrain'))
router.use('/uploadImage', loggedInCheck, require('./uploadImage'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;