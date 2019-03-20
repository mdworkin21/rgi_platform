const router = require('express').Router()

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
      res.sendStatus(401)
    }
  } catch(err){
    next(err)
  }
}

//Granular Routes
router.use('/admin', adminCheck, require('./admin'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;