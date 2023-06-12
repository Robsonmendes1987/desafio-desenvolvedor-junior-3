import jwt from './jwt.utils'

export const tokenemail = (token: string) => {
  const decode = jwt.decodeToken(String(token)) as any
  const {
    decode: { email },
  } = decode

  return email
}
