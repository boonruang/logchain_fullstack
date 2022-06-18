const express = require('express')
const router = express.Router()
const role = require('../models/role')
const constants = require('../config/constant')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')
const JwtMiddleware = require('../config/Jwt-Middleware')

//  @route                  POST  /api/v2/role
//  @desc                   Add role
//  @access                 Public
router.post('/', async (req, res) => {
  try {
    let result = await role.create(req.body)
    res.json({ result: constants.kResultOk, message: result })
  } catch (error) {
    res.json({ result: constants.kResultNok, message: error })
  }
})

//  @route                  GET  /api/v2/user/list
//  @desc                   list all users
//  @access                 Private
router.get('/list', async (req, res) => {
  const roleFound = await role.findAll()
  if (roleFound) {
    res.status(200).json({
      status: 'ok',
      result: roleFound,
    })
  } else {
    res.status(500).json({
      status: 'nok',
    })
  }
})

//  @route                  GET  /api/v2/user/:id
//  @desc                   Get mock info
//  @access                 Private

router.get('/:id', async (req, res) => {
  let id = req.params.id

  try {
    const roleFound = await user.findOne({ where: { id } })

    if (roleFound) {
      res.status(200).json(roleFound)
    } else {
      res.status(500).json({
        result: 'id not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

module.exports = router
