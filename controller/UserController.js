
import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../model/index.js'

const userRouter = express.Router()

const monitoringRouter = express.Router()

userRouter.use(bodyParser.json())
monitoringRouter.use(bodyParser.json())

//Users

userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res)
})

userRouter.get('/:id', (req, res) => {
    users.fetchUser(req, res)
})

//  userRouter.post('/register', (req, res) => {
//     users.registerUser(req, res)
//  })

//  userRouter.post('/login', (req, res) => {
//     users.login(req, res)
//  })


//monitors

monitoringRouter.get('/', (req, res) => {
   users.fetchMonitors(req, res)
})

monitoringRouter.post('/register', (req,res) => {
   users.registerUser(req, res)

})

monitoringRouter.post('/login', (req,res) => {
   users.login(req,res)
})

monitoringRouter.patch('/:id/update', (req, res) => {
   users.updateUser(req,res)
})

 export {
    userRouter,
    express,
    monitoringRouter
 }