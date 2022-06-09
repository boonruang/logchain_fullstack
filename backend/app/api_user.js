const express = require('express')
const router = express.Router()
const user = require('../models/user')
const role = require('../models/role')
const bcrypt = require('bcryptjs')
const constants = require('../constant')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')
const JwtMiddleware = require('../config/Jwt-Middleware')
const formidable = require('formidable')

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
// router.post('/register', async (req, res) => {
//   try {
//     req.body.password = bcrypt.hashSync(req.body.password, 8)
//     let result = await user.create(req.body)
//     res.json({ result: constants.kResultOk, message: result })
//   } catch (error) {
//     res.json({ result: constants.kResultNok, message: error })
//   }
// })

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
      let roleId = fields.roleId
      let result = await user.create({
        firstname,
        lastname,
        username,
        password,
        roleId,
      })

      if (result) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result),
        })
      } else {
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

//  @route                  POST  /api/v2/user/
//  @desc                   Add user use formidable on reactjs userCreate
//  @access                 Private
router.put('/', JwtMiddleware.checkToken, async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async (error, fields, files) => {
    console.log('Formidable Update fields: ', fields)
    console.log('Formidable Update Error: ', error)
  })

  try {
    const form = new formidable.IncomingForm()
    let firstname = fields.firstname
    let lastname = fields.lastname
    let username = fields.username
    let password = bcrypt.hashSync(fields.password, 8)
    let roleId = fields.roleId

    form.parse(req, async (error, fields, files) => {
      let result = await user.update(
        {
          firstname,
          lastname,
          username,
          password,
          roleId,
        },
        { where: { id: fields.id } },
      )
      console.log('Formidable update fields: ', fields)
      if (result) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result),
        })
      } else {
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

//  @route                  GET  /api/v2/user/list
//  @desc                   list all users
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  // const userFound = await user.findAll({
  //   attributes: { exclude: ['password'] },
  //   order: [['id', 'ASC']]
  // })

  try {
    const userFound = await user.findAll({
      attributes: { exclude: ['password'] },
      // order: [['id', 'ASC']],
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

//  @route                  GET  /api/v2/user/:id
//  @desc                   Get mock info
//  @access                 Private
router.get('/:id', JwtMiddleware.checkToken, async (req, res) => {
  let id = req.params.id

  try {
    const userFound = await user.findOne({
      attributes: { exclude: ['password'] },
      where: { id },
    })

    if (userFound) {
      res.status(200).json(userFound)
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
        res.status(200).json({
          message: 'User deleted',
        })
      } else {
        // user delete failed
        res.status(500).json({
          message: 'User delete failed',
        })
      }
    } else {
      // user not found
      res.status(500).json({
        message: 'User not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
})

module.exports = router
