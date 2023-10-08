import { BaseUseCase } from '@main/base/base-use-case'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@main/di/tokens'
import { AddDonationRepository } from './add-donation-repository'
import { DonationRequest } from './donation-request'
import { DonationResponse } from './donation-response'

@injectable()
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
      observation,
      images,
      donatedBy
    } = input

    const id = await this.addDonationRepository.add({
      animalType,
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