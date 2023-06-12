import {
  UserProps,
  UserResponse,
  UsersRepositories,
} from '../users-repositories'
import User from '../../models/user.model'
export class SequelizeUserRepository implements UsersRepositories {
  async create({ email, name, password }: UserProps): Promise<UserResponse> {
    const { dataValues } = await User.create({ name, email, password })
    return dataValues
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return null
    }
    return user.dataValues
  }

  async findById(id: string): Promise<UserResponse | null> {
    const user = await User.findByPk(id)
    if (!user) {
      return null
    }
    return user.dataValues
  }
}
