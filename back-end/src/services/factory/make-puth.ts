import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { PuthPost } from '../post/puth-post'

export function MakePuthPost() {
  const postRepository = new SequelizePostRepository()
  const FindPost = new PuthPost(postRepository)
  return FindPost
}
