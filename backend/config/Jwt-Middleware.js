const JWT = require('jsonwebtoken')
const JwtConfig = require('./Jwt-Config')

const checkToken = async (req, res, next) => {
  let userToken = await req.headers['authorization']
  // console.log('req header in Middleware: ', req.headers)
  JWT.verify(userToken, JwtConfig.secret, (error, data) => {
    if (error) {
      // console.log('JWT Error: ', error)
      return res.status(501).json({
        error,
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
