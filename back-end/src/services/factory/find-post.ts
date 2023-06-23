import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { FindAllPost } from '../post/find-all-posts'

export function FindPost() {
  const postRepository = new SequelizePostRepository()
  const FindPost = new FindAllPost(postRepository)
  return FindPost
}
