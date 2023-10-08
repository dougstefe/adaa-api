import { User } from '@domain/user/entities/user'

export interface GetUserByEmailRepository {
  getUserByEmail(email: string): Promise<User>
}