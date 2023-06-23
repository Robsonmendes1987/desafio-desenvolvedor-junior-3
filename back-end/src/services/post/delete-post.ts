import { PostsRepositories } from '../../repositories/posts-repositoriess'

interface DeletPost {
  id: string
}

export class DeleteDataPost {
  constructor(private readonly postsRepositories: PostsRepositories) {}

  delete = async ({ id }: DeletPost): Promise<any> => {
    const findPost = await this.postsRepositories.findById(id)
    if (!findPost) {
      return {
        type: 400,
        message: 'Nao foi possivel excluir, Post nao encontrado',
      }
    }
    await this.postsRepositories.destroy(id)
    return { type: 204, message: 'Post Excluido Com Sucesso' }
  }
}
