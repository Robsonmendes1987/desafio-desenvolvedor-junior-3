import { SequelizeUserRepository } from '../../repositories/sequelize-db/sequelize-user-repository'
import { SequelizePostRepository } from '../../repositories/sequelize-db/sequelize-post-repository'
import { RegisterPost } from '../post/create-post'

export function MakePost() {
  const useRepository = new SequelizeUserRepository()
  const postRepository = new SequelizePostRepository()
  const registerPost = new RegisterPost(postRepository, useRepository)
  return registerPost
}
