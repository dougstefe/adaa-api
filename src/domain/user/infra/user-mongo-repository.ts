import { User } from '@domain/user/entities/user'
import { GetUserByEmailRepository } from '@domain/user/use-cases/login/get-user-repository'
import { inject, injectable } from 'tsyringe'
import { BaseMongoRepository } from '@main/base/base-mongo-repository'
import { tokens } from '@main/di/tokens'
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { UserMapper } from './user-mapper'

@injectable()
export class UserMongoRepository extends BaseMongoRepository<User> implements GetUserByEmailRepository {

  protected collectionName = 'users'

  constructor(
    @inject(tokens.MongoDbClient)
    protected readonly client: MongoDbClient,
    @inject(tokens.UserMapper)
    protected readonly mapper: UserMapper
  ) {
    super()
  }

  async getUserByEmail(email: string): Promise<User> {
    const record = await this.find(
      {
        email
      }
    )

    return this.mapper.map(record)
  }



}