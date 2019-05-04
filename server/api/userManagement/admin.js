const router = require('express').Router()
const {db, User} = require('../../db/models')


router.get('/getUsers', async (req, res, next) => {
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

//Allows Admin to create new user
router.post('/newSignup', async (req, res, next) => {
  try{
    const newUser = await User.create(req.body)
    res.sendStatus(201);
  }catch(err){
    if (err.name === 'SequelizeUniqueConstraintError'){
      let errMsg = err.errors[0].message
      //For some reason errMsg doesn't actually get sent, so I have a work around for now
      res.status(401).send(errMsg)
    } else {
        next(err)
    }
  }
})

router.delete('/deleteUser/:id/', async (req, res, next) => {
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