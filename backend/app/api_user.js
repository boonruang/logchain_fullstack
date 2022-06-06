const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const constants = require('../constant')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')
const JwtMiddleware = require('../config/Jwt-Middleware')

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

//  @route                  GET  /api/v2/user/list
//  @desc                   list all users
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  const userFound = await user.findAll({
    attributes: { exclude: ['password'] },
    order: [['id', 'ASC']],
  })
  if (userFound) {
    res.status(200).json({
      status: 'ok',
      result: userFound,
    })
  } else {
    res.status(500).json({
      status: 'nok',
    })
  }
})

//  @route                  GET  /api/v2/user/info
//  @desc                   Get mock info
//  @access                 Private

router.get('/info', JwtMiddleware.checkToken, async (req, res) => {
  let active_user = await user.count()
  let users = await user.count({
    distinct: 'true',
    col: 'users.username',
  })

  setTimeout(() => {
    res.json({
      active_user,
      users,
    })
  }, 100)
})

module.exports = router
