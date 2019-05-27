import Bcrypt from 'bcryptjs'

export const comparePassword = (password, dbPassword) => {
  return Bcrypt.compareSync(password, dbPassword)
}
