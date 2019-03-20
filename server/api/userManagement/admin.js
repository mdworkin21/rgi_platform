const router = require('express').Router()
const {db, User, SignupToken} = require('../../db/models')

const adminCheck = async (req, res, next) => {
  let userIsAdmin;
  try{
    userIsAdmin = await User.findOne({
      where: {
        id: req.session.passport.user
      }
    })
    console.log('USER', userIsAdmin)
    if (userIsAdmin.isAdmin){
      next()
    } else {
      res.sendStatus(401)
    }
  } catch(err){
    res.status(401).send(userIsAdmin)
  }
}

router.get('/getUsers', adminCheck, async (req, res, next) => {
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

//Allows Admin to create new signup token
router.post('/newSignup', async (req, res, next) => {
  try{
    await SignupToken.create({
      email: req.body.email,
      signupCode: req.body.code,
      role: req.body.role
    })
    res.sendStatus(201)
  }catch(err){
    next(err)
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