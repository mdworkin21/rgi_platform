const router = require('express').Router()
const {db, User} = require('../../db/models')


router.get('/:id', async (req, res, next) => {
  try{
    const userInfo = await User.findByPk(req.params.id)
    res.status(200).send(userInfo)
  } catch(err){
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    let updatedUser
    if (req.body.password === ''){
      updatedUser = await User.update({
        email: req.body.email,
      }, 
        {
          where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
    } else {
      //First Hash and Salt New Password
      const user = await User.findByPk(req.params.id)
      const [newSalt, newPassword] = user.updatePassword(req.body.password)
      updatedUser = await User.update({
        email: req.body.email,
        password: newPassword,
        salt: newSalt
      }, 
        {
          where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
    }
    const [, updated] = updatedUser
    res.status(202).send(updated)
  }catch(err){
    next(err)
  }
})

module.exports = router