import { Request, Response } from 'express'
import { MakePost } from '../services/factory/make-post'
import { ResourceNotFoundError } from '../services/errors/resource-not-found.error'
import { tokenemail } from '../utils/token-email'

interface createPost {
  name: string
  id: string
  authorId: string
  title: string
  content: string
}

export default class RegisterPostController {
  register = async (
    req: Request<object, object, createPost>,
    res: Response,
  ) => {
    const { name, title, content, authorId } = req.body
    console.log('PEGOU MAKEPOST', authorId)
    const token = req.headers.authorization
    const email = tokenemail(String(token))

    try {
      console.log('PEGOU POST', req.body)
      const registerPostCase = MakePost()
      await registerPostCase.create({
        name,
        authorId,
        email,
        title,
        content,
      })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(409).json({ message: error.message })
      }
    }
    return res.status(201).json({ name, authorId, content, title })
  }
}
