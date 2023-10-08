import { BaseMongoRepository } from '@main/base/base-mongo-repository'
import { Pet } from '@domain/pet/entities/pet'
import { AddPetRepository } from '../../pet/use-cases/add/add-pet-repository'
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'

@injectable()
export class PetMongoRepository extends BaseMongoRepository<Pet> implements AddPetRepository {
  protected collectionName: string = 'pets'

  constructor(
    @inject(tokens.MongoDbClient)
    protected readonly client: MongoDbClient,
  ) {
    super()
  }

  add(pet: Pet): Promise<string> {
    return this.insert(pet)
  }

}