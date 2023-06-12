import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
// import { UserProps } from '../repositories/users-repositories'

const createToken = (email: string) => {
  const token = jwt.sign({ email }, `${process.env.TOKEN_SECRET}` as string, {
    expiresIn: '1d',
    algorithm: 'HS256',
  })
  return token
}

const validateToken = (token: string) => {
  if (!token) {
    return { type: 401, message: 'Token not found' }
  }

  try {
    const data = jwt.verify(token, `${process.env.TOKEN_SECRET}` as string)
    return { type: null, message: data }
  } catch (error) {
    return { type: 401, message: 'Invalid token' }
  }
}

const decodeToken = (token: string) => {
  const decode = jwt.decode(token)
  return { decode }
}
export default { validateToken, createToken, decodeToken }
