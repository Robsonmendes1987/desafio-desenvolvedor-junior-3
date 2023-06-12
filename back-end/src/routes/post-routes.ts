import express from 'express'
import RegisterPostController from '../controller/register-post-controller'
// import { validateToken } from '../utils/jwt.utils'

const router = express.Router()
const registerPost = new RegisterPostController()

router.post('/post', async (req, res) => registerPost.register(req, res))

export default router
