import { User } from '@domain/user/models/user'

export interface ValidateToken {
  validateToken(accessToken: string): User
}