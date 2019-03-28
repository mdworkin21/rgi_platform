const router = require('express').Router()
const {db, User} = require('../../db/models')


router.get('/:id', async (req, res, next) => {
  try{
    console.log('LOG', req.params)
    const userInfo = await User.findByPk(req.params.id)
    res.status(200).send(userInfo)
  } catch(err){
    next(err)
  }
})


module.exports = router