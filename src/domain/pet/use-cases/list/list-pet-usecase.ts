import { BaseUseCase } from '@main/base/base-use-case'
import { ListPetRequest } from './list-pet-request'
import { ListPetResponse } from './list-pet-response'
import { PaginationRequest } from '@domain/shared/pagination/pagination-request'
import { PaginationResponse } from '@domain/shared/pagination/pagination-response'
import { ListPetRepository } from './list-pet-repository'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'

@injectable()
export class ListPetUseCase extends BaseUseCase<PaginationRequest<ListPetRequest>, PaginationResponse<ListPetResponse> | undefined> {
  constructor(
    @inject(tokens.PetRepository)
    private readonly listRepository: ListPetRepository
  ) {
    super()
  }
  async execute(input: PaginationRequest<ListPetRequest>): Promise<PaginationResponse<ListPetResponse> | undefined> {
    const {
      total,
      data
    } = await this.listRepository.list(input)

    return {
      total,
      data: data.map(x => {
        const {
          type,
          color,
          datebirth,
          name,
          observation,
          images
        } = x
        return {
          type,
          color,
          datebirth,
          name,
          observation,
          images
        }
      })
    }
  }

}