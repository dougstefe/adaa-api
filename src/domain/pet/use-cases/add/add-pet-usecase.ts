import { BaseUseCase } from '@main/base/base-use-case'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { AddPetRepository } from './add-pet-repository'
import { AddPetRequest } from './add-pet-request'
import { AddPetResponse } from './add-pet-response'

@injectable()
export class AddPetUseCase extends BaseUseCase<AddPetRequest, AddPetResponse | undefined> {
  constructor(
    @inject(tokens.PetRepository)
    private readonly addRepository: AddPetRepository
  ) {
    super()
  }

  async execute(input: AddPetRequest): Promise<AddPetResponse | undefined> {
    const {
      type,
      color,
      datebirth,
      name,
      observation,
      images,
      donatedBy
    } = input

    const id = await this.addRepository.add({
      type,
      color,
      datebirth,
      name,
      observation,
      images,
      donatedBy
    })

    return { id }
  }

}