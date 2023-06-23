import { Request, Response } from 'express'
import { FindPost } from '../services/factory/find-post'

interface createPost {
  id: string
  authorId: string
  title: string
  content: string
}

export default class FindAllPost {
  resultAll = async (
    req: Request<object, object, createPost>,
    res: Response,
  ) => {
    console.log('PEGOU POST', req.body)
    const findAllPostCase = FindPost()
    const result = await findAllPostCase.findAll()
    return res.status(201).json(result)
  }
}
