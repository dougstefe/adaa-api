import { BaseMongoRepository } from '@main/base/base-mongo-repository'
import { Donation } from '../entities/donation'
import { AddDonationRepository } from '../use-cases/add/add-donation-repository'
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'

@injectable()
export class DonationMongoRepository extends BaseMongoRepository<Donation> implements AddDonationRepository {
  protected collectionName: string = 'donations'

  constructor(
    @inject(tokens.MongoDbClient)
    protected readonly client: MongoDbClient,
  ) {
    super()
  }

  add(donation: Donation): Promise<string> {
    return this.insert(donation)
  }

}