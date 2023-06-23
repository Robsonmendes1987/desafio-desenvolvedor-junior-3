import { Request, Response } from 'express'
import { MakeDeletePost } from '../services/factory/make-delete-post'

export class DeletePostController {
  deletepost = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log('FACTORY CONTROLLER DELETE POST', id)

    const deletePost = MakeDeletePost()
    const { type, message } = await deletePost.delete({ id })
    console.log('FACTORY CONTROLLER MESSAGE', message)

    res.status(type).json(message)
  }
}
