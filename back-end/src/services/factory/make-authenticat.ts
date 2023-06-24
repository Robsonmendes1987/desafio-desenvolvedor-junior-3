import { SequelizeUserRepository } from '../../repositories/sequelize-db/sequelize-user-repository'
import { AuthenticateService } from '../user/authenticate'
export function MakeAuthenticate() {
  const useRepository = new SequelizeUserRepository()
  const authenticateService = new AuthenticateService(useRepository)
  return authenticateService
}
