import express from 'express'
import PostController from '../controller/register-post-controller'
import FindPostController from '../controller/find-all-post'
import { DeletePostController } from '../controller/delete-post'
// import { validateToken } from '../utils/jwt.utils'

const router = express.Router()
const registerPost = new PostController()
const findAllPost = new FindPostController()
const deletePost = new DeletePostController()

router.post('/post', async (req, res) => registerPost.register(req, res))
router.get('/', async (req, res) => findAllPost.resultAll(req, res))
router.delete('/:id', async (req, res) => deletePost.deletepost(req, res))

export default router
