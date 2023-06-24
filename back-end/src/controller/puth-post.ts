import { Request, Response } from 'express'
import { MakePuthPost } from '../services/factory/make-puth'

// interface IPuthPost {
//   id: string
//   authorId: string
//   title: string
//   content: string
// }

export class PuthPost {
  puth = async (req: Request, res: Response) => {
    const { id } = req.params
    const { content, title } = req.body
    console.log('CONTROLLER PUTH POS TBY ID', id)

    const makePuthPost = MakePuthPost()
    await makePuthPost.puthpost({ id, content, title })
    return res.status(201).send('Post Atualizado')
  }
}
