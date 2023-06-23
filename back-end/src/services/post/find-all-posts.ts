import {
  PostsRepositories,
  //   PostsProps,
  PostResponse,
} from '../../repositories/posts-repositoriess'
// import { UsersRepositories } from '../../repositories/users-repositories'
// import { ResourceNotFoundError } from '../errors/resource-not-found.error'

// interface findRequest {
//   authorId: string
//   email: string
//   content: string
//   title: string
// }

export class FindAllPost {
  constructor(
    // private readonly usersRepositories: UsersRepositories,
    private readonly postsRepositories: PostsRepositories,
  ) {}

  findAll = async (): Promise<PostResponse[]> => {
    const findAllPost = await this.postsRepositories.findAll()
    return findAllPost
  }
}
