const router = require('express').Router()

//Granular Routes
router.use('/admin', require('./admin'))
router.use('/user', require('./user') )

//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;