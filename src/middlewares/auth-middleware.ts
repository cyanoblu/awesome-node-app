const jwt = require('jsonwebtoken')
const User = require('../models/user.ts')

const isAuth = (req, res, next) => {
  // Checks token authenticity and validates

  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        req.redirect('/auth/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/auth/login')
  }
}

const getUserLocal = (req, res, next) => {
  // Checks token authenticity and validates

  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { isAuth, getUserLocal }
