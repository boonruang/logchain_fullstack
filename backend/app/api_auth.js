const express = require('express')
const router = express.Router()
// const user = require('../models/user')
// const bcrypt = require('bcryptjs')
// const constants = require('../config/constant')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')

//  @route                  POST  /api/v2/auth/verify
//  @desc                   User authorization verify & get token
//  @access                 Private
router.post('/verify', async (req, res) => {
  let userToken = req.headers['authorization']
  JWT.verify(userToken, JwtConfig.secret, (error, data) => {
    if (error) {
      res.status(500).json({
        error,
      })
    } else {
      res.status(200).json({
        message: 'Authorized',
        user: data.username,
      })
    }
  })
})

module.exports = router
