const router = require('express').Router()

//Granular Routes
router.use('/admin', require('./admin'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;