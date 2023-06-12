import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  user?: string | object // Substitua o tipo pela estrutura do objeto de usuário
}

const validateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }
  try {
    const decodedToken = verify(authorization, 'sua-chave-secreta') as
      | string
      | object // Substitua o tipo pela estrutura do objeto de usuário
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

export default validateToken
