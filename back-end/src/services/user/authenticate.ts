import { compare } from 'bcryptjs'
import { UsersRepositories } from '../../repositories/users-repositories'
import { InvalidCredentialError } from '../errors/invalid-credentials-error'
import jwt from '../../utils/jwt.utils'

interface UserResponse {
  token: string
}

interface User {
  email: string
  password: string
}

export class AuthenticateService {
  constructor(private readonly usersRepositories: UsersRepositories) {}

  authenticate = async ({ email, password }: User): Promise<UserResponse> => {
    const user = await this.usersRepositories.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialError()
    }
    const validatePassword = await compare(password, user.password)
    if (!validatePassword) {
      throw new InvalidCredentialError()
    }

    const token = jwt.createToken(email)
    return { token }
  }
}
