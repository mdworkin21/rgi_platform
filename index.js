const {app} = require('./server')
const PORT = process.env.PORT || 3000
const {db} = require('./server/db/models')
const seed = require('./scripts/seed')

// Syncs with DB and listens for connections on host and port
// Put in {force: true} (to db.sync()) to update heroku db
//Don't use in production, dangerous!
db.sync() 
  .then(() => seed()) //uncomment this line for initial seeding comment out/delete after
  .then(() => {
    console.log('db synced.')
    app.listen(PORT, () => {
      console.log('Server Live on Port: ', PORT)
    })
  });


