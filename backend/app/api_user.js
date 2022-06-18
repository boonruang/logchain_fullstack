const express = require('express')
const router = express.Router()
const user = require('../models/user')
const role = require('../models/role')
const bcrypt = require('bcryptjs')
const constants = require('../config/constant')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')
const JwtMiddleware = require('../config/Jwt-Middleware')
const formidable = require('formidable')

//  @route                  GET  /api/v2/user/list
//  @desc                   list all users
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  // const userFound = await user.findAll({
  //   attributes: { exclude: ['password'] },
  //   order: [['id', 'ASC']]
  // })
  console.log('get user list API called')
  try {
    const userFound = await user.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']],
      // where: {
      //   roleId: 1,
      // },
      include: [
        {
          model: role,
          // attributes: ['id', 'name'],
          attributes: ['id', 'name'],
        },
      ],
    })
    if (userFound) {
      console.log('userFound in list API: ', userFound)
      res.status(200).json({
        status: 'ok',
        result: userFound,
      })
    } else {
      res.status(500).json({
        status: 'nok',
      })
    }
  } catch (error) {
    res.status(500).json({
      Error: error.toString(),
    })
  }
})

//  @route                  GET  /api/v2/user/info
//  @desc                   Get user info
//  @access                 Private

router.get('/info', JwtMiddleware.checkToken, async (req, res) => {
  let all_user = await user.count()
  let active_user = await user.count({ where: { status: true } })
  let inactive_user = await user.count({ where: { status: false } })

  setTimeout(() => {
    res.json({
      all_user,
      active_user,
      inactive_user,
    })
  }, 100)
})

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
          roleId: userFound.roleId,
          status: userFound.status,
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

//  @route                  POST  /api/v2/user/
//  @desc                   Add user use formidable on reactjs userCreate
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
      // console.log('Formidable Post fields: ', fields)
      let firstname = fields.firstname
      let lastname = fields.lastname
      let username = fields.username
      let password = bcrypt.hashSync(fields.password, 8)
      let status = fields.status
      let roleId = fields.roleId
      let userFound = await user.findOne({
        where: { username: fields.username },
      })
      if (userFound) {
        // duplicated user
        res.json({
          result: constants.kResultNok,
          Error: 'Duplicated user',
        })
      } else {
        // Create user
        let result = await user.create({
          firstname,
          lastname,
          username,
          password,
          status,
          roleId,
        })

        if (result) {
          res.json({
            result: constants.kResultOk,
            message: 'User created',
          })
        } else {
          res.json({
            result: constants.kResultNok,
            Error: error,
          })
        }
      }
    })
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    })
  }
})

//  @route                  PUT  /api/v2/user/
//  @desc                   Update User use formidable on reactjs userCreate
//  @access                 Private
router.put('/', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
      var firstname = fields.firstname
      var lastname = fields.lastname
      var username = fields.username
      if (fields.password) {
        console.log('Password not empty need to be crypted')
        var password = bcrypt.hashSync(fields.password, 8)
      }
      let status = fields.status
      var roleId = fields.roleId

      console.log('Formidable Update fields: ', fields)
      console.log('Formidable Update Error: ', error)
      let result = await user.update(
        {
          firstname,
          lastname,
          username,
          password,
          status,
          roleId,
        },
        { where: { id: fields.id } },
      )
      if (result) {
        console.log('Formidable Updated: ', result)
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result),
        })
      } else {
        console.log('Formidable update Error: ', error)
        res.json({
          result: constants.kResultNok,
          Error: error,
        })
      }
    })
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    })
  }
})

//  @route                  GET  /api/v2/user/:id
//  @desc                   Get user by Id
//  @access                 Private
router.get('/:id', JwtMiddleware.checkToken, async (req, res) => {
  let id = req.params.id

  try {
    const userFound = await user.findOne({
      // attributes: { exclude: ['password'] },
      where: { id },
    })

    if (userFound) {
      // res.status(200).json(userFound)
      res.status(200).json({
        id: userFound.id,
        username: userFound.username,
        password: '',
        password2: '',
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        status: userFound.status,
        roleId: userFound.roleId,
      })
    } else {
      res.status(500).json({
        result: 'not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

//  @route                  DELETE  /api/v2/user/:id
//  @desc                   Delete user by id
//  @access                 Private
router.delete('/:id', JwtMiddleware.checkToken, async (req, res) => {
  try {
    const userFound = await user.findOne({ where: { id: req.params.id } })
    if (userFound) {
      // User found
      const userDeleted = await user.destroy({
        where: {
          id: req.params.id,
        },
      })

      if (userDeleted) {
        // user deleted
        console.log(`User id: ${req.params.id} deleted`)
        res.status(200).json({
          result: constants.kResultOk,
          message: `User id: ${req.params.id} deleted`,
        })
      } else {
        // user delete failed
        console.log(`User id: ${req.params.id} delete failed`)
        res.status(500).json({
          result: constants.kResultNok,
          message: `User id: ${req.params.id} delete failed`,
        })
      }
    } else {
      // user not found
      res.status(500).json({
        result: constants.kResultNok,
        message: 'User not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      Error: error.toString(),
    })
  }
})

module.exports = router
