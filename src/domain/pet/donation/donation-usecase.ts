import { BaseUseCase } from '@main/base/base-use-case'
import { DonationRequest } from './models/donation-request'
import { DonationResponse } from './models/donation-response'
import { inject } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { AddDonationRepository } from './infra/interfaces/add-donation-repository'

export class DonationUseCase extends BaseUseCase<DonationRequest, DonationResponse | undefined> {
  constructor(
    @inject(tokens.DonationRepository)
    private readonly addDonationRepository: AddDonationRepository
  ) {
    super()
  }

  async execute(input: DonationRequest): Promise<DonationResponse | undefined> {
    const {
      animalType,
      color,
      datebirth,
      name,
      observation
    } = input

    const id = await this.addDonationRepository.add({
      animalType,
      color,
      datebirth,
      name,
      observation
    })

    return { id }
  }

}