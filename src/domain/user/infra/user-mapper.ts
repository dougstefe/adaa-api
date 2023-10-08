import { WithId } from 'mongodb'
import { injectable } from 'tsyringe'
import { User } from '../entities/user'

@injectable()
export class UserMapper {
  map(record: WithId<User>): User {
    const { _id: id, ...user } = record

    return {
      ...user,
      id: String(id),
    }
  }
}