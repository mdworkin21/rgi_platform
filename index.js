const app = require('./server')
const PORT = process.env.PORT || 3000
const {db} = require('./server/db/models')
const seed = require('./scripts/seed')

// Syncs with DB and listens for connections on host and port
// Put in {force: true} (to db.sync()) to update heroku db
//Don't use in production, dangerous!
//To seed heroku db, put this line after db.sync line: .then(() => seed())
db.sync({force: true})
  // .then(() => seed())
  .then(() => {
    console.log('db synced.')
    app.listen(PORT, () => {
      console.log('Server Live on Port: ', PORT)
    })
  });
