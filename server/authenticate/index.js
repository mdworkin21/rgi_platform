const router = require('express').Router()
const User = require('../db/models/User')

//Checks to see if user exists in db, and whether pw is correct. 

router.get('/getUser/:id', (req, res, next) => {
  if (req.user){
    res.status(200).send(req.user)
  }
})


router.post('/checkUser', async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: {
        userName: req.body.user.userName
      }
    }) 
    if(!user){
      res.status(401).send('Wrong username and/or password')
    } else if (user.password !== req.body.user.password) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch(err){

  }
})

router.post('/newUser', async (req, res, next) => {
  try{
    const newUser = await User.create(req.body)
    req.login(newUser, err => (err ? next(err) : res.status(201).send(newUser)))

    // res.status(201).send(newUser)
  }catch(err){
    next(err)
  }
})


router.delete('/logout', async(req, res, next) => {
  try{
    req.logOut()
    req.session.destroy()
    res.sendStatus(202)
  }catch(err){
    next(err)
  }
})

module.exports = router 