const db = require('../database')
const Sequelize = require('sequelize')
const crypto = require ('crypto')

//Signup Tokens Model
const SignupToken = db.define('signupTokens', {
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
  signupCode: {
    type: Sequelize.STRING,
    allowNull: false,
    get(){
      return () => this.getDataValue('signupCode')
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isMediaBuyer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAnalytics: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }, 
})

//Instance Methods
SignupToken.prototype.checkPassword = function(signupCode) {
  return SignupToken.encryptPassword(signupCode, this.salt()) === this.signupCode()
}

// Class Methods
SignupToken.generateSalt = function() {
  return crypto
          .randomBytes(16)
          .toString('hex') 
          .slice(0, 16)
}

SignupToken.encryptsignupCode = function (signupCode, salt){
  return crypto
          .createHash('sha256')
          .update(signupCode)
          .update(salt)
          .digest('hex')
}


//Hooks
const setSaltAndSignupCode = (signupToken) => {
  if (signupToken.changed('signupCode')){
    signupToken.salt = SignupToken.generateSalt()
    signupToken.signupCode = SignupToken.encryptsignupCode(signupToken.signupCode(), signupToken.salt())
  }
}


SignupToken.beforeCreate( setSaltAndSignupCode)
SignupToken.beforeUpdate( setSaltAndSignupCode)

module.exports = SignupToken
