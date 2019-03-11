const router = require('express').Router()
const {db, User} = require('../../db/models')



router.get('/getUsers', async(req, res, next) => {
  try{
    const allUsers = await User.findAll()
    res.status(200).send(allUsers)
  }catch(err){
    next(err)
  }

})


module.exports = router