import {
  PostsRepositories,
  //   PostResponse,
  PostsProps,
} from '../../repositories/posts-repositoriess'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

interface PuthResponsebyId {
  puth: PostsProps
}

interface Iputh {
  id: string
  //   authorId: string
  title: string
  content: string
}
export class PuthPost {
  constructor(private readonly postsRepositories: PostsRepositories) {}

  puthpost = async ({
    id,
    // authorId,
    title,
    content,
  }: Iputh): Promise<PuthResponsebyId> => {
    console.log('ID DO POST', id)
    const findPostById = this.postsRepositories.findById(id)
    if (!findPostById) {
      throw new ResourceNotFoundError()
    }
    const puth = await this.postsRepositories.puth({
      id,
      title,
      content,
    })
    return { puth }
  }
}
