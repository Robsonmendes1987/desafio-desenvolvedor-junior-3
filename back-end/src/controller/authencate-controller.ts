import { Request, Response } from 'express'
import { MakeAuthenticate } from '../services/factory/make-authenticat'
import { InvalidCredentialError } from '../services/errors/invalid-credentials-error'

interface createUser {
  email: string
  password: string
}

export default class AuthenticateController {
  authenticate = async (
    req: Request<object, object, createUser>,
    res: Response,
  ) => {
    const { email, password } = req.body
    try {
      const authenticateService = MakeAuthenticate()
      const token = await authenticateService.authenticate({ email, password })
      return res.status(201).json(token)
    } catch (error) {
      if (error instanceof InvalidCredentialError) {
        return res.status(409).json({ message: error.message })
      }
    }
  }
}
