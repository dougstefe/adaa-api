import { User } from '@domain/user/login/models/user'

export interface ValidateToken {
  validateToken(accessToken: string): User
}