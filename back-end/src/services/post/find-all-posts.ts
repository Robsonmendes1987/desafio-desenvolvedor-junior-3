import {
  PostsRepositories,
  PostResponse,
} from '../../repositories/posts-repositoriess'

export class FindAllPost {
  constructor(private readonly postsRepositories: PostsRepositories) {}

  findAll = async (): Promise<PostResponse[]> => {
    const findAllPost = await this.postsRepositories.findAll()
    return findAllPost
  }
}
