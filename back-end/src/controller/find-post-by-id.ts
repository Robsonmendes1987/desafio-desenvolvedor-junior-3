import { Request, Response } from 'express'
import { FindPost } from '../services/factory/find-post-by-id'

// interface IFindPost {
//   id: string
//   authorId: string
//   title: string
//   content: string
// }

export default class FindPostById {
  findbyid = async (req: Request, res: Response) => {
    // const { authorId, title, content } = await
    const { id } = req.params
    console.log('CONTROLLER FIND POST ID', id)

    // const { authorId, content, title } = req.body

    const findPostId = FindPost()
    const result = await findPostId.findPostById({ id })
    return res.status(200).json({ result })
  }
}
