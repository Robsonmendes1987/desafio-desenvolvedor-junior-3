import {
  PostsRepositories,
  PostsProps,
} from '../../repositories/posts-repositoriess'
import { UsersRepositories } from '../../repositories/users-repositories'
import { ResourceNotFoundError } from '../errors/resource-not-found.error'

interface PostResponse {
  post: PostsProps
}

interface postRequest {
  authorId: string
  email: string
  content: string
  title: string
}

export class RegisterPost {
  constructor(
    private readonly postsRepositories: PostsRepositories,
    private readonly usersRepositories: UsersRepositories,
  ) {}

  create = async ({
    authorId,
    email,
    title,
    content,
  }: postRequest): Promise<PostResponse> => {
    const findUser = await this.usersRepositories.findByEmail(email)
    console.log('FACTORY CREATE POST', authorId, email, title, content)
    console.log('FACTORY FINDUSER', findUser?.id)
    if (!findUser) {
      throw new ResourceNotFoundError()
    }
    const post = await this.postsRepositories.create({
      authorId: findUser?.id,
      title,
      content,
    })
    console.log('FACTORY FINDUSER', authorId)

    return { post }
  }
}
