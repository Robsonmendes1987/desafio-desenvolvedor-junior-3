import express from 'express'
import PostController from '../controller/register-post-controller'
import FindPostController from '../controller/find-all-post'
import { DeletePostController } from '../controller/delete-post'
import FindPostById from '../controller/find-post-by-id'
// import { validateToken } from '../utils/jwt.utils'

const router = express.Router()
const registerPost = new PostController()
const findAllPost = new FindPostController()
const deletePost = new DeletePostController()
const findPostById = new FindPostById()

router.post('/post', async (req, res) => registerPost.register(req, res))
router.get('/findbyid/:id', async (req, res) => findPostById.findbyid(req, res))
router.get('/getallposts', async (req, res) => findAllPost.resultAll(req, res))
router.delete('/:id', async (req, res) => deletePost.deletepost(req, res))

export default router
