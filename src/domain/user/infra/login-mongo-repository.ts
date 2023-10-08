import { User } from '@domain/user/entities/user'
import { GetUserByEmailRepository } from '@domain/user/use-cases/login/get-user-repository'
import { inject, injectable } from 'tsyringe'
import { BaseMongoRepository } from '@main/base/base-mongo-repository'
import { tokens } from '@main/di/tokens'
import { MongoDbClient } from '@shared/db/MongoDbClient'

@injectable()
export class LoginMongoRepository extends BaseMongoRepository<User> implements GetUserByEmailRepository {
  users: User[] = [
    {
      email: 'prillybsb@gmail.com',
      name: 'Priscila Lessa',
      birthdate: new Date(1986, 7, 14),
      password: '$2b$08$VzGFZhJYkaC99Y7Wq9/D5OI6P3L4YKut1tybMa4jd1D5vlYUQ8uRq' //isabella
    }
  ]

  protected collectionName = 'users'

  constructor(
    @inject(tokens.MongoDbClient)
    protected readonly client: MongoDbClient,
  ) {
    super()
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.find(
      {
        email
      }
    )
  }

}