import {
  PostsProps,
  PostResponse,
  PostsRepositories,
} from '../posts-repositoriess'

import Post from '../../models/post.model'

export interface PostsPropsId {
  id: string
  authorId: string
  title: string
  content: string
}

export class SequelizePostRepository implements PostsRepositories {
  async findById(id: string): Promise<PostResponse | null> {
    const user = await Post.findByPk(id)
    if (!user) {
      return null
    }
    return user.dataValues
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

  async puth({
    id,
    authorId,
    title,
    content,
  }: PostsPropsId): Promise<PostResponse | null> {
    const user = await Post.findByPk(authorId)
    if (!user) {
      return null
    }
    await user.update({ title, content }, { where: { authorId } })
    return user
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
}
