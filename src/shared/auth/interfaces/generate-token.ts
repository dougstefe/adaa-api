import { User } from '@domain/user/models/user'

export interface GenerateToken {
  generateToken(user: User): string
}