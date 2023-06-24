import {
  // PostResponse,
  // PostsProps,
  PostsRepositories,
} from '../../repositories/posts-repositoriess'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

// interface postRequest {
//   id: string
//   authorId: string
//   title: string
//   content: string
// }

interface PostResponseId {
  id: string
}

export class FIndByIdPost {
  constructor(private readonly postsRepositories: PostsRepositories) {}

  findPostById = async ({ id }: PostResponseId): Promise<any> => {
    const findPost = await this.postsRepositories.findById(id)
    // console.log('FACTORY CREATE POST', email, title, content)
    if (!findPost) {
      throw new ResourceNotFoundError()
    }
    return { findPost }
  }
}
