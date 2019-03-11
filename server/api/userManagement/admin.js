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


router.delete('/deleteUser/:id', async(req, res, next) => {
  try{
    await User.destroy({where: {
      id: req.params.id
    }})
    res.sendStatus(200)
  }catch(err){
    next(err)
  }
})

module.exports = router