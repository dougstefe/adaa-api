import { User } from '@domain/user/login/models/user'

export interface GenerateToken {
  generateToken(user: User): string
}