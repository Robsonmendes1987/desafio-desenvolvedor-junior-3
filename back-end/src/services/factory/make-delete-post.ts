import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { DeleteDataPost } from '../post/delete-post'

export function MakeDeletePost() {
  const postRepository = new SequelizePostRepository()
  const DeletePost = new DeleteDataPost(postRepository)
  return DeletePost
}
