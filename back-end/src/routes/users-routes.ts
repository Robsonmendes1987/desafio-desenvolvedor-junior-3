import express from 'express'
import RegisterUser from '../controller/register-user-controller'
import AuthenticateController from '../controller/authencate-controller'

const rout = express.Router()
const resgisterUser = new RegisterUser()
const authenticateController = new AuthenticateController()
rout.post('/authenticate', async (req, res) =>
  authenticateController.authenticate(req, res),
)
rout.post('/user', async (req, res) => resgisterUser.register(req, res))

export default rout
