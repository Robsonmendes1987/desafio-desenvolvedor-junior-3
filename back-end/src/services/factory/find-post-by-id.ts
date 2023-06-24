import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { FIndByIdPost } from '../post/find-post-by-id'

export function FindPost() {
  const postRepository = new SequelizePostRepository()
  const FindPost = new FIndByIdPost(postRepository)
  return FindPost
}
