// import { SequelizeUserRepository } from '../../repositories/sequelize-db/sequelize-user-repository'
import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { FindAllPost } from '../post/find-all-posts'

export function FindPost() {
  // const useRepository = new SequelizeUserRepository()
  const postRepository = new SequelizePostRepository()
  const FindPost = new FindAllPost(postRepository)
  return FindPost
}
