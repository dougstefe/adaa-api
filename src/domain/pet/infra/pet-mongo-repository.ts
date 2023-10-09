import { BaseMongoRepository } from '@main/base/base-mongo-repository'
import { Pet } from '@domain/pet/entities/pet'
import { AddPetRepository } from '../../pet/use-cases/add/add-pet-repository'
import { MongoDbClient } from '@shared/db/MongoDbClient'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { ListPetRepository } from '../use-cases/list/list-pet-repository'
import { PaginationRequest } from '@domain/shared/pagination/pagination-request'
import { ListPetFilter } from '../use-cases/list/filters/list-pet-filter'
import { PaginationResponse } from '@domain/shared/pagination/pagination-response'

@injectable()
export class PetMongoRepository extends BaseMongoRepository<Pet> implements AddPetRepository, ListPetRepository {
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

  async list(params: PaginationRequest<ListPetFilter>): Promise<PaginationResponse<Pet>> {
    const {
      filter,
      from,
      size,
      sort: {
        by: sort,
        direction: sortDirection
      }
    } = params

    const total = await this.count(filter)
    let data: Pet[] = []
    if (total > 0) {
      data = await this.find(
        filter,
        from,
        size,
        sort,
        sortDirection
      )
    }
    return {
      total,
      data
    }

  }

}