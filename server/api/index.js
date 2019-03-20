const router = require('express').Router();
const {db, User} = require('../db/models')

//API Routes 
router.use('/userManagement', require('./userManagement'))


//Handles 404 Errors
router.use((req, res, next) => {
  const err = new Error('Not Found.')
  err.status = 404; 
  next(err)
})

module.exports = router;