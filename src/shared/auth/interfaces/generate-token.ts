import { User } from '@domain/user/login/models/user'

export interface GenerateToken {
  genetareToken(user: User): string
}