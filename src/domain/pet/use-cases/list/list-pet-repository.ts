import { Pet } from '@domain/pet/entities/pet'
import { PaginationRequest } from '@domain/shared/pagination/pagination-request'
import { PaginationResponse } from '@domain/shared/pagination/pagination-response'
import { ListPetFilter } from './filters/list-pet-filter'

export interface ListPetRepository {
  list(params: PaginationRequest<ListPetFilter>): Promise<PaginationResponse<Pet>>
}