const JWT = require('jsonwebtoken')
const JwtConfig = require('./Jwt-Config')

const checkToken = (req, res, next) => {
  let userToken = req.headers['authorization']

  JWT.verify(userToken, JwtConfig.secret, (error, data) => {
    if (error) {
      return res.status(500).json({
        error: error,
      })
    } else {
      res.user = data
      next()
    }
  })
}

module.exports = {
  checkToken: checkToken,
}
