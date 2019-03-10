const db = require('../database')
const Sequelize = require('sequelize')
const crypto = require('crypto')

//User Model
const User = db.define('users', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: {
      args: true,
      msg: 'Username already in use!'
  }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    },
    unique: {
      args: true,
      msg: 'Email address already in use!'
  }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    //Kind of a hack to get around Sequelize's lack of privacy
    //This makes it so when the user object gets sent back to frontend, hashed pw isn't there (same with salt and isAdmin below)
    get(){
      return () => this.getDataValue('password')
    } 
  },
  salt: {
    type: Sequelize.STRING,
    //See above
    get(){
      return () => this.getDataValue('salt')
    } 
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    //Probably best to also hide who's an admin
    get(){
      return () => this.getDataValue('isAdmin')
    }
  }
})


//Instance Methods
User.prototype.checkPassword = function(userPassword) {
  return User.encryptPassword(userPassword, this.salt()) === this.password()

}

// Class Methods
User.generateSalt = function() {
  return crypto
          .randomBytes(16)
          .toString('hex') 
          .slice(0, 16)
}

User.encryptPassword = function (userPassword, salt){
  return crypto
          .createHash('sha256')
          .update(userPassword)
          .update(salt)
          .digest('hex')
}


//Hooks
const setSaltAndPassword = (user) => {
  if (user.changed('password')){
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User