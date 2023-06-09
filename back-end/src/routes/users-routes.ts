import express from 'express'
import RegisterUser from '../controller/register-user-controller'

const rout = express.Router();
const resgisterUser = new RegisterUser()
rout.post('/', async (req, res) => resgisterUser.register(req, res))

export default rout