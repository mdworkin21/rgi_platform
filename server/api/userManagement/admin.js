const router = require('express').Router()
const {db, User} = require('../../db/models')

//Protects routes from nonadmin users asking for resources, add to all routes

const adminCheck = (req, res, next) => {
  if (req.body.isAdmin){
    next()
  } else {
    res.status(401).send('Unauthorizeid')
  }
}

router.get('/getUsers', async(req, res, next) => {
  try{
    const allUsers = await User.findAll()
    res.status(200).send(allUsers)
  }catch(err){
    next(err)
  }
})

router.put('/updateAdminPriv/:id/:value', async(req, res, next) => {
  try{
    const updateUser = await User.update({
      isAdmin: req.params.value
    },
      {
        where: {
          id:  req.params.id
        },
        returning: true, // needed for affectedRows to be populated
        plain: true 
      })
      const [, updated] = updateUser
      res.status(202).send(updated)
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