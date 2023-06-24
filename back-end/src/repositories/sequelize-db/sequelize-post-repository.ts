import {
  PostsProps,
  PostResponse,
  PostsRepositories,
} from '../posts-repositoriess'

import Post from '../../models/post.model'
import { ResourceNotFoundError } from '../../services/errors/resource-not-found.error'

export interface PostsPropsId {
  id: string
  authorId: string
  title: string
  content: string
}

export class SequelizePostRepository implements PostsRepositories {
  async findById(id: string): Promise<PostsPropsId> {
    const result = await Post.findByPk(id)
    if (!result) {
      throw new ResourceNotFoundError()
    }
    return result
  }

  async findAll(): Promise<PostResponse[]> {
    const user = await Post.findAll()
    return user
  }

  async destroy(id: string): Promise<any> {
    const user = await Post.findByPk(id)

    if (!user) {
      return {
        type: 400,
        message: 'Nao foi possivel excluir, Post nao encontrado',
      }
    }
    await Post.destroy({ where: { id } })
    return {
      type: 204,
      message: 'Post excluido com sucesso',
    }
  }

  async puth(data: PostsPropsId): Promise<any> {
    // const user = await Post.findByPk(id)
    // if (!user) {
    //   throw new ResourceNotFoundError()
    // }
    // ({ ...funcionario }, { where: { id } })
    console.log('SEQUELIZE', data)
    const puth = await Post.update({ ...data }, { where: { id: data.id } })
    return puth
  }

  async create({
    authorId,
    title,
    content,
  }: PostsProps): Promise<PostResponse> {
    console.log('DATAVELUES SEQUELIZE DB', authorId, title, content)
    const { dataValues } = await Post.create({ authorId, title, content })

    return dataValues
  }

  // async findPostById({
  //   id,
  //   authorId,
  //   content,
  //   title,
  // }: PostsProps): Promise<PostResponse> {
  //   const dataValues = await Post.findByPk(id)

  //   return { dataValues }
  // }
}
