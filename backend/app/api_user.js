const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const constants = require('../constant')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')

//  @route                  POST  /api/v2/user/login
//  @desc                   User login
//  @access                 Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  let userFound = await user.findOne({ where: { username: username } })
  if (userFound != null) {
    // user found

    if (bcrypt.compareSync(password, userFound.password)) {
      // password match
      // Generate user token

      let userToken = JWT.sign(
        {
          id: userFound.id,
          username: userFound.username,
        },
        JwtConfig.secret,
        {
          expiresIn: JwtConfig.expiresIn,
          notBefore: JwtConfig.notBefore,
        },
      )

      res.status(200).json({
        result: constants.kResultOk,
        token: userToken,
      })
    } else {
      res.json({
        userFound: constants.kResultNok,
        message: 'Incorrect password',
      })
    }
  } else {
    res.json({ userFound: constants.kResultNok, message: 'Incorrect username' })
  }
})

//  @route                  POST  /api/v2/user/register
//  @desc                   User register
//  @access                 Public
router.post('/register', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let result = await user.create(req.body)
    res.json({ result: constants.kResultOk, message: result })
  } catch (error) {
    res.json({ result: constants.kResultNok, message: error })
  }
})

module.exports = router
