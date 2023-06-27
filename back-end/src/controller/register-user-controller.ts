import { Request, Response } from 'express'
import { MakeUser } from '../services/factory/make-user'
import { UserAlreadyExistsError } from '../services/errors/user-already-exists-error'

interface createUser {
  name: string
  email: string
  password: string
}

export default class RegisterUserController {
  register = async (
    req: Request<object, object, createUser>,
    res: Response,
  ) => {
    const { name, email, password } = req.body
    try {
      console.log('PEGOU', req.body)
      const registerUseCase = MakeUser()
      await registerUseCase.create({ email, name, password })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).json({ message: error.message })
      }
    }
    return res.status(201).json({ message: 'usuario criado com sucesso' })
  }
}
