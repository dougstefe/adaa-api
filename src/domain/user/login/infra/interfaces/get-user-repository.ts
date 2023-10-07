import { User } from '@domain/user/login/models/user'

export interface GetUserByEmailRepository {
  getUserByEmail(email: string): Promise<User>
}